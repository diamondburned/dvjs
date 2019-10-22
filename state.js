import * as dvjs from "./dv.js"

// State takes care of incoming websocket events and update them in the internal
// state. It takes care of:
//     - Guild   (this.Guilds[i])
//         - Create
//         - Update
//         - Delete
//     - Channel (this.Guilds[i].channels[i])
//         - Create
//         - Update
//         - Delete
//     - Message (this.Guilds[i].channels[i].messages[i]) (latest is at the last)
//         - Update channel's message ID
//     - User
//         - Create (on READY)
//         - Update
//     - Guild Members TODO
export class State extends dvjs.Session {
    constructor(token) {
        super(token)

        // Map of IDs to their objects
        this.Guilds = {}
        this.PrivateChannels = {}

        super._setStateEventHandler("READY", ready => {
            // Fields manually set explicitly for clarity
            this.User = ready.user
            this.SessionID = ready.session_id

            // Fill up the guilds
            for (let guild of ready.guilds) {
                this.Guilds[guild.id] = guild
            }

            // Fill up the private channels
            for (let dm of ready.private_channels) {
                this.PrivateChannels[dm.id] = dm
            }
        })

        // User

        super._setStateEventHandler("USER_UPDATE", u => {
            this.User = Object.assign(this.User, u)
        })

        // Message

        super._setStateEventHandler("MESSAGE_CREATE", m => {
            let ch = this.GetChannel(m.channel_id)
            if (!ch) {
                // Can't find channel
                return
            }

            ch.last_message_id = m.id
        })

        // Channels

        super._setStateEventHandler("CHANNEL_CREATE", ch => {
            if (!ch.guild_id) {
                // Channel is a private channel
                this.PrivateChannels[ch.id] = ch
                return
            }

            let guild = this.Guilds.find(g => g.id == ch.guild_id)
            if (!guild) {
                // Give up.
                return
            }

            if (!guild.channels) {
                // State guild doesn't have an initialized channels field, we'll
                // just make one
                guild.channels = [ch]
                return
            }

            let i = guild.channels.findIndex(old => old.id == ch.id)
            if (i < 0) {
                // not found
                // We add the channel to the slice
                guild.channels.push(ch)
                return
            }

            // This should never happen, but what do I know?
            guild.channels[i] = Object.assign(guild.channels[i], ch)
        })

        super._setStateEventHandler("CHANNEL_UPDATE", async ch => {
            if (!ch.guild_id) {
                let old = this.PrivateChannels[ch.id]
                if (old) {
                    this.PrivateChannels[ch.id] = Object.assign(old, ch)
                }

                // If it's not in the list, don't even try.
                return
            }

            let guild = this.Guilds.find(g => g.id == ch.guild_id)
            if (!guild || !guild.channels) {
                // Give up.
                return
            }

            let i = guild.channels.findIndex(old => old.id == ch.id)
            if (i < 0) {
                // Not found, fetch it from the API.
                guild.channels.push(await super.Channel(ch.id))
                return
            }

            // This should always happen, but what do I know?
            guild.channels[i] = Object.assign(guild.channels[i], ch)
        })

        super._setStateEventHandler("CHANNEL_DELETE", ch => {
            if (ch.guild_id) {
                // Delete the private channel
                delete this.PrivateChannels[ch.id]
                return
            }

            let guild = this.Guilds.find(g => g.id == ch.guild_id)
            if (!guild || !guild.channels) {
                // Give up,
                return
            }

            let i = guild.channels.findIndex(old => old.id == ch.id)
            if (i < 0) {
                // Give up.
                return
            }

            // Delete the channel from the slice
            guild.channels.splice(i, 1)
        })

        // Guilds

        super._setStateEventHandler("GUILD_CREATE", guild => {
            this.Guilds[guild.id] = guild
        })

        super._setStateEventHandler("GUILD_UPDATE", async guild => {
            let old = this.Guilds[guild.id]
            if (old) {
                this.Guilds[guild.id] = Object.assign(old, guild)
            } else {
                this.Guilds[guild.id] = await super.Guild(guild.id)
            }
        })

        super._setStateEventHandler("GUILD_DELETE", guild => {
            delete this.Guilds[guild.id]
        })

        // Guild Members

        super._setStateEventHandler("")
    }

    // This method searches the state for the channel. If it can't find the
    // channel, it'll fetch from the API and update the state.
    async GetChannel(chID, guildID) {
        let dm = this.PrivateChannels.find(ch => ch.id == chID)
        if (dm) {
            return dm // Found a private channel
        }

        if (guildID) {
            let guild = this.Guilds.find(g => g.id == guildID)
            if (!guild || !guild.channels) {
                return
            }

            return guild.channels.find(ch => ch.id == chID)
        }

        // Iterate over all guilds
        for (let guild of this.Guilds) {
            if (!guild.channels) {
                continue
            }

            // Iterate over all channels of that guild
            for (let ch of guild.channels) {
                // If the IDs match
                if (chID == ch.id) {
                    return ch
                }
            }
        }

        try {
            let ch = await super.UserChannel(chID)
            // Add the private channel to the state
            this.PrivateChannels.push(ch)
            return ch
        } catch (error) {
            // Ignore, maybe it's not a private channel
        }

        try {
            let ch = await super.Channel(chID),
                guild = this.Guilds.find(g => g.id == ch.guild_id)

            if (!guild) {
                // Can't find guild, give up on updating state.
                return ch
            }

            // Add the channel to the guild. The channel is guaranteed to not be
            // anywhere in any guilds because of the above 2D loop.
            guild.channels.push(ch)
            return ch
        } catch (error) {
            // Just return nothing at this point.
        }
    }
}
