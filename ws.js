const WSIdentity = {
	"$os": "Mangaka Linux",
	"$browser": "Mozilla Chromium v69.0.4",
	"$device": "Emacs-Teledildonics v2.3",
	"$referer": "",
	"$referrign_domain": "",
}

// new Gateway("wss://", token, callbackObject)
//     Close() 
export class Gateway {
	constructor(gateway, token, evCallback) {
		this.gateway = gateway
		this.token = token
		this.callbacks = evCallback

		this.ws = new WebSocket(gateway)
		this.ws.addEventListener("message", (wsEvent) => {
			let ev = JSON.parse(wsEvent.data)
			// store the sequence
			this.sequence = ev.s

			ev = this.onPacket(ev)
			if (ev) this.onEvent(ev.t, ev.d)
		})

		// TODO: ws error => reconnect

		this.ready = false

		// TODO: lastHeartBeatAck

		// things to be filled:
		//     this.sequence     - the Discord magical sequence number
		//     this.beatInterval - the ms between each heartbeat
		//     this.beatLoop     - the ID of the background heartbeat loop
	}

	Close() {
		clearInterval(this.beatLoop) // clean up
		this.ws.close(1000) // normal closure
	}

	json(obj) {
		this.ws.send(JSON.stringify(obj))
	}

	// ev: string, data: object
	// onEvent is probably what you're looking for
	onEvent(event, data) {
		if (this.callbacks[event]) {
			this.callbacks[event](data)
		} else {
			// Debug only
			console.log("Unknown event:", event)
		}
	}

	// ev: object
	// onPacket is the lower level packet, contains the OP code, the raw event
	// data as well as a few more fields
	onPacket(ev) {
		switch (ev.op) {
			case 1: // heartbeat
				op(1, this.sequence)
				break

			case 7: // reconnect
				this.reconnect()
				break

			case 9: // invalid session
				this.identify()
				break

			case 10: // hello
				// Get the heartbeat interval
				this.beatInterval = ev.d.heartbeat_interval

				// TODO: Add Op 6 resume, right now only Op 2
				// send IDENTIFY (2), expect READY
				this.identify()
				break

			case 11: // heartbeat ACK
				// TODO: should probably to something
				break

			case 0: // DISPATCH, just normal
				switch (ev.t) { // event Type
					case "READY":
					case "RESUMED":
						// clean up the old beatLoop
						if (this.beatLoop) clearInterval(this.beatLoop)

						// start sending heartbeats in the background
						this.beatLoop = setInterval(
							() => this.heartbeat(),
							this.beatInterval,
						)

						this.ready = true
					default:
						return ev
				}
				break

			default: // dunno, just log and return
				console.log("UNKNOWN EVENT", ev)
				break
		}
	}

	// utils
	op(code, data) {
		this.json({
			"op": code,
			"d": data,
		})
	}

	reconnect() {
		// Safely close the connection
		this.Close()

		// Make a new Gateway
		let gateway = new Gateway(this.gateway, this.token, this.callbacks)

		// Override the old Gateway with the new one
		Object.assign(this, gateway)
	}

	// Replies
	identify() {
		this.json({
			"op": 2,
			"d": {
				"token": this.token,
				"properties": WSIdentity,
				"large_threshold": 250, // TODO: const
				"compress": false,
			},
		})
	}

	heartbeat() {
		try { this.op(1, this.sequence) } catch(err) {
			// can't send heartbeat, probably reconnect
			this.reconnect()
		}
	}
}

