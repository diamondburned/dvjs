export const APIVersion = "6",
    Status = "https://status.discordapp.com/api/v2/",
    Sm = Status + "scheduled-maintenances/",
    SmActive = Sm + "active.json",
    SmUpcoming = Sm + "upcoming.json"

export const Discord = "https://discordapp.com/",
    API = Discord + "api/v" + APIVersion + "/",
    Guilds = API + "guilds/",
    Channels = API + "channels/",
    Users = API + "users/",
    Gateway = API + "gateway",
    GatewayBot = Gateway + "/bot",
    Webhooks = API + "webhooks/"

export const CDN = "https://cdn.discordapp.com/",
    CDNAttachments = CDN + "attachments/",
    CDNAvatars = CDN + "avatars/",
    CDNIcons = CDN + "icons/",
    CDNSplashes = CDN + "splashes/",
    CDNChannelIcons = CDN + "channel-icons/",
    CDNBanners = CDN + "banners/"

export const Auth = API + "auth/",
    Login = Auth + "login",
    Logout = Auth + "logout",
    Verify = Auth + "verify",
    VerifyResend = Auth + "verify/resend",
    ForgotPassword = Auth + "forgot",
    ResetPassword = Auth + "reset",
    Register = Auth + "register"

export const User = uID => Users + uID,
    UserAvatar = (uID, aID) => CDNAvatars + uID + "/" + aID + ".png",
    UserAvatarAnimated = (uID, aID) => CDNAvatars + uID + "/" + aID + ".gif",
    UserDefaultUserAvatar = discrim => {
        let id = parseInt(discrim, 10) % 5
        return CDN + "embed/avatars/" + id + ".png"
    },
    UserSettings = uID => Users + uID + "/settings",
    UserGuilds = uID => Users + uID + "/guilds",
    UserGuild = (uID, gID) => Users + uID + "/guilds" + gID,
    UserChannels = uID => Users + uID + "/channels"

export const Guild = gID => Guilds + gID,
    GuildChannels = gID => Guilds + gID + "/channels",
    GuildMembers = gID => Guilds + gID + "/members",
    GuildMember = (gID, uID) => Guilds + gID + "/members/" + uID,
    GuildMemberRole = (gID, uID, rID) =>
        Guilds + gID + "/members/" + uID + "/roles/" + rID,
    GuildBans = gID => Guilds + gID + "/bans",
    GuildBan = (gID, uID) => Guilds + gID + "/bans/" + uID,
    GuildIntegrations = gID => Guilds + gID + "/integrations",
    GuildIntegration = (gID, iID) => Guilds + gID + "/integrations/" + iID,
    GuildIntegrationSync = (gID, iID) =>
        Guilds + gID + "/integrations/" + iID + "/sync",
    GuildRoles = gID => Guilds + gID + "/roles",
    GuildRole = (gID, rID) => Guilds + gID + "/roles/" + rID,
    GuildInvites = gID => Guilds + gID + "/invites",
    GuildEmbed = gID => Guilds + gID + "/embed",
    GuildPrune = gID => Guilds + gID + "/prune",
    GuildIcon = (gID, hash) => CDNIcons + gID + "/" + hash + ".png",
    GuildIconAnimated = (gID, hash) => CDNIcons + gID + "/" + hash + ".gif",
    GuildSplash = (gID, hash) => CDNSplashes + gID + "/" + hash + ".png",
    GuildWebhooks = gID => Guilds + gID + "/webhooks",
    GuildAuditLogs = gID => Guilds + gID + "/audit-logs",
    GuildEmojis = gID => Guilds + gID + "/emojis",
    GuildEmoji = (gID, eID) => Guilds + gID + "/emojis/" + eID,
    GuildBanner = (gID, hash) => CDNBanners + gID + "/" + hash + ".png"

export const Channel = cID => Channels + cID,
    ChannelPermissions = cID => Channels + cID + "/permissions",
    ChannelPermission = (cID, tID) => Channels + cID + "/permissions/" + tID,
    ChannelInvites = cID => Channels + cID + "/invites",
    ChannelTyping = cID => Channels + cID + "/typing",
    ChannelMessages = cID => Channels + cID + "/messages",
    ChannelMessage = (cID, mID) => Channels + cID + "/messages/" + mID,
    ChannelMessageAck = (cID, mID) =>
        Channels + cID + "/messages/" + mID + "/ack",
    ChannelMessagesBulkDelete = cID => Channels + cID + "/messages/bulk-delete",
    ChannelMessagesPins = cID => Channels + cID + "/pins",
    ChannelMessagePin = (cID, mID) => Channels + cID + "/pins/" + mID
