export const APIVersion = "6"

export const Status     = "https://status.discordapp.com/api/v2/"
export const Sm         = Status + "scheduled-maintenances/"
export const SmActive   = Sm + "active.json"
export const SmUpcoming = Sm + "upcoming.json"

export const Discord    = "https://discordapp.com/"
export const API        = Discord + "api/v" + APIVersion + "/"
export const Guilds     = API + "guilds/"
export const Channels   = API + "channels/"
export const Users      = API + "users/"
export const Gateway    = API + "gateway"
export const GatewayBot = Gateway + "/bot"
export const Webhooks   = API + "webhooks/"

export const CDN             = "https://cdn.discordapp.com/"
export const CDNAttachments  = CDN + "attachments/"
export const CDNAvatars      = CDN + "avatars/"
export const CDNIcons        = CDN + "icons/"
export const CDNSplashes     = CDN + "splashes/"
export const CDNChannelIcons = CDN + "channel-icons/"

export const Auth           = API + "auth/"
export const Login          = Auth + "login"
export const Logout         = Auth + "logout"
export const Verify         = Auth + "verify"
export const VerifyResend   = Auth + "verify/resend"
export const ForgotPassword = Auth + "forgot"
export const ResetPassword  = Auth + "reset"
export const Register       = Auth + "register"

// clang-format off
// Why can't clang-format do a better job tbh

export const User = (uID) => 
	Users + uID
export const UserAvatar = (uID, aID) => 
	CDNAvatars + uID + "/" + aID + ".png"
export const UserAvatarAnimated = (uID, aID) =>
	CDNAvatars + uID + "/" + aID + ".gif"
export const UserDefaultUserAvatar = (discrim) => {
	let id = parseInt(discrim, 10) % 5
	return CDN + "embed/avatars/" + id + ".png"
}

export const UserSettings = (uID) => 
	Users + uID + "/settings"
export const UserGuilds = (uID) => 
	Users + uID + "/guilds"
export const UserGuild = (uID, gID) => 
	Users + uID + "/guilds" + gID
export const UserChannels = (uID) => 
	Users + uID + "/channels"

export const Guild = (gID) => 
	Guilds + gID
export const GuildChannels = (gID) => 
	Guilds + gID + "/channels"
export const GuildMembers = (gID) => 
	Guilds + gID + "/members"
export const GuildMember = (gID, uID) => 
	Guilds + gID + "/members/" + uID
export const GuildMemberRole = (gID, uID, rID) =>
	Guilds + gID + "/members/" + uID + "/roles/" + rID
export const GuildBans = (gID) => 
	Guilds + gID + "/bans"
export const GuildBan = (gID, uID) => 
	Guilds + gID + "/bans/" + uID
export const GuildIntegrations = (gID) => 
	Guilds + gID + "/integrations"
export const GuildIntegration = (gID, iID) =>
	Guilds + gID + "/integrations/" + iID
export const GuildIntegrationSync = (gID, iID) =>
	Guilds + gID + "/integrations/" + iID + "/sync"
export const GuildRoles = (gID) => 
	Guilds + gID + "/roles"
export const GuildRole = (gID, rID) => 
	Guilds + gID + "/roles/" + rID
export const GuildInvites = (gID) => 
	Guilds + gID + "/invites"
export const GuildEmbed = (gID) => 
	Guilds + gID + "/embed"
export const GuildPrune = (gID) =>
	Guilds + gID + "/prune"
export const GuildIcon = (gID, hash) => 
	CDNIcons + gID + "/" + hash + ".png"
export const GuildIconAnimated = (gID, hash) =>
	CDNIcons + gID + "/" + hash + ".gif"
export const GuildSplash = (gID, hash) =>
	CDNSplashes + gID + "/" + hash + ".png"
export const GuildWebhooks = (gID) => 
	Guilds + gID + "/webhooks"
export const GuildAuditLogs = (gID) => 
	Guilds + gID + "/audit-logs"
export const GuildEmojis = (gID) => 
	Guilds + gID + "/emojis"
export const GuildEmoji = (gID, eID) => 
	Guilds + gID + "/emojis/" + eID
export const GuildBanner = (gID, hash) => 
	CDNBanners + gID + "/" + hash + ".png"

export const Channel = (cID) => 
	Channels + cID
export const ChannelPermissions = (cID) => 
	Channels + cID + "/permissions"
export const ChannelPermission = (cID, tID) =>
	Channels + cID + "/permissions/" + tID
export const ChannelInvites = (cID) => 
	Channels + cID + "/invites"
export const ChannelTyping = (cID) => 
	Channels + cID + "/typing"
export const ChannelMessages = (cID) => 
	Channels + cID + "/messages"
export const ChannelMessage = (cID, mID) =>
	Channels + cID + "/messages/" + mID
export const ChannelMessageAck = (cID, mID) =>
	Channels + cID + "/messages/" + mID + "/ack"
export const ChannelMessagesBulkDelete = (cID) =>
	Channels + cID + "/messages/bulk-delete"
export const ChannelMessagesPins = (cID) => 
	Channels + cID + "/pins"
export const ChannelMessagePin = (cID, mID) => 
	Channels + cID + "/pins/" + mID
