const GatewayVersion = 6
const LargeThreshold = 25

const endpoints = import("endpoints.js")

"use strict"

// TODO: state

class Discord {
    constructor(token) { this.token = token }

    Gateway() {
        let r = await request("GET", endpoints.Gateway), url = await r.json()
        return url
    }

    Open() {
        if (this.ws) {
            throw ("WS already open")
        }

        if (!this.gateway) {
            this.gateway = await this.Gateway();
            this.gateway += `?v=${endpoints.APIVersion}&encoding=json`
        }
    }
}

// TODO: rate limit bucket
function request(method, url) {
    return fetch(url, {
        method : method,
    })
}
