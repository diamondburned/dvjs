import * as dvjs from "./dv.js"

const tests = [
	["Gateway", async (s) => {
		console.log(await s.Gateway())
	}],
	["Open", async (s) => {
		s.SetEventHandler("MESSAGE_CREATE", (msg) => {
			console.log("Message created", msg)
		})

		s.SetEventHandler("READY", () => {
			console.log("READY")
		})

		await s.Open()
	}],
	["Reconnect", async (s) => {
		// Sleep before reconnecting
		await _sleep(2000)

		await s.ws.reconnect()
	}],
]

var session = new dvjs.Session(
	prompt("Enter your Discord token"),
)

async function RunTest() {
	for (const [name, fn] of tests) {
		console.log("Running " + name)
		await fn(session).catch(err => {
			console.error(`Test ${name} failed, reason: ${err}`)
		})
	}
}

// For testing
function _sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

RunTest()
