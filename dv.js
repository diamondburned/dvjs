const GatewayVersion = 6
const LargeThreshold = 25

import * as endpoints from "./endpoints.js"
import * as ws        from "./ws.js"

"use strict"

// TODO: state

export class Session {
    constructor(token) {
        this.token     = token;
        this.callbacks = {}
    }

    SetEventHandler(event, callback) {
        this.callbacks[event] = callback
    }

    async Gateway() {
        let r = await request("GET", endpoints.Gateway)
        let j = await r.json()
        return j.url
    }

    async Open() {
        if (this.ws) {
            throw ("WS already open")
        }

        if (!this.gateway) {
            this.gateway = await this.Gateway();
            this.gateway += `?v=${endpoints.APIVersion}&encoding=json`
        }

        // Start the websocket
        this.ws = new ws.Gateway(this.gateway, this.token, this.callbacks)
    }

    // channelID and limit are needed
    async ChannelMessages(channelID, limit, beforeID, afterID, aroundID) {
        let r = await getWithForm(endpoints.ChannelMessages(channelID), {
            "limit": limit,
            "after": afterID,
            "before": beforeID,
            "around": aroundID,
        })

        let msgs = await r.json()
        return msgs
    }
}

// TODO: rate limit bucket
// opts: { headers: {} }
function request(method, url, opts) {
    if (!opts) {
        return fetch(url, {
            method: method,
        })
    }

    return fetch(url, Object.assign(opts, {
        method: method,
    }))
}

// TODO: rate limit bucket
function getWithForm(url, form, opts) {
    let fields = [];
    for (const [k, v] of Object.entries(v)) {
        if (!v) {
            continue
        }

        fields.push(encodeURIComponent(k) + "=" + encodeURIComponent(v))
    }

    return request("GET", url + "?" + fields.join("&"), opts)
}
