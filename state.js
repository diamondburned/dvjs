import * as dvjs from "./dv.js"

export class State extends dvjs.Session {
    constructor(token) {
        super(token)

        // Map of IDs to their objects
        this.Guilds = {}
        this.PrivateChannels = {}

        token.SetEventHandler("READY", ready => {
            // Fields manually set explicitly for clarity
            this.User = ready.user
            this.SessionID = ready.session_id

            for (let guild of ready.guilds) {
                this.Guilds[guild.id] = guild
            }

            for (let dm of ready.private_channels) {
                this.PrivateChannels[dm.id] = dm
            }
        })

        token.SetEventHandler("GUILD_CREATE", guild => {
            this.Guilds[guild.id] = guild
        })

        token.SetEventHandler("GUILD_UPDATE", guild => {
            let old = this.Guilds[guild.id]
            if (old) {
                this.Guilds[guild.id] = Object.assign(old, guild)
            } else {
                // TODO: Fetch from API
                this.Guilds[guild.id] = guild
            }
        })

        token.SetEventHandler("GUILD_DELETE", guild => {
            delete this.Guilds[guild.id]
        })
    }
}
