const dvjs = await import("./dv.js")

const tests = {
	"Gateway" : async (s) => {
		console.log(await s.Gateway())
	},
}

var session = new dvjs.Session("")

async function RunTest() {
	for (const [name, fn] of Object.entries(tests)) {
		console.log("Running " + name)
		await fn(session).catch(err => {
			console.error(`Test ${name} failed, reason ${err}`)
		})
	}
}

RunTest()
