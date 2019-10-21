import * as dvjs from "./dv.js"

var session = new dvjs.Session(prompt("Enter your Discord token"))

;("use strict")

const tests = {
    Gateway: async () => {
        console.log(await session.Gateway())
    },
    Open: async () => {
        session.SetEventHandler("MESSAGE_CREATE", function(msg) {
            console.log("Message created", msg)
        })

        session.SetEventHandler("READY", function() {
            console.log("READY")
        })

        await session.Open()
    },
    Reconnect: async () => {
        // Sleep before reconnecting
        await _sleep(2000)

        // Reconnnect
        await session.ws.reconnect()
    },
    "Get Channels": async () => {},
}

async function RunTest() {
    for (const [name, fn] of tests) {
        console.log("Running " + name)
        await fn(session).catch(function(err) {
            console.error(`Test ${name} failed, reason: ${err}`)
        })
    }
}

// For testing
function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

RunTest()
