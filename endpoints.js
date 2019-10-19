export const APIVersion = "6"

export const Status = "https://status.discordapp.com/api/v2/",
	Sm = Status + "scheduled-maintenances/", 
	SmActive = Sm + "active.json",
	SmUpcoming = Sm + "upcoming.json",

	Discord = "https://discordapp.com/",
	API = Discord + "api/v" + APIVersion + "/", 
	Guilds = API + "guilds/",
	Channels = API + "channels/", 
	Users = API + "users/",
	Gateway = API + "gateway", 
	GatewayBot = Gateway + "/bot",
	Webhooks = API + "webhooks/",

	CDN = "https://cdn.discordapp.com/",
	CDNAttachments = CDN + "attachments/", 
	CDNAvatars = CDN + "avatars/",
	CDNIcons = CDN + "icons/", 
	CDNSplashes = CDN + "splashes/",
	CDNChannelIcons = CDN + "channel-icons/",

	Auth = API + "auth/", 
	Login = Auth + "login", 
	Logout = Auth + "logout",
	Verify = Auth + "verify", 
	VerifyResend = Auth + "verify/resend",
	ForgotPassword = Auth + "forgot",
	ResetPassword = Auth + "reset",
	Register = Auth + "register"
