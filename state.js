import * as dvjs from "./dv.js"

export class State extends dvjs.Session {
	constructor(token) {
		super(token);

		// Map of IDs to their objects
		this.Guilds   = {};
		this.Channels = {};

		token.SetEventHandler("READY", (ready) => console.log(ready));
	}
}
