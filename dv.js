import * as endpoints from "./endpoints.js"
import * as ws from "./ws.js"
import * as limiter from "./limiter.js"
;("use strict")

// TODO: state

export class Session {
    constructor(token) {
        this.token = token
        this.callbacks = {}
        this.fetcher = new limiter.Fetcher()
    }

    SetEventHandler(event, callback) {
        this.callbacks[event] = callback
    }

    async Gateway() {
        let r = await this.fetcher.Request("GET", endpoints.Gateway)
        let j = await r.json()
        return j.url
    }

    async Open() {
        if (this.ws) {
            throw "WS already open"
        }

        if (!this.gateway) {
            this.gateway = await this.Gateway()
            this.gateway += `?v=${endpoints.APIVersion}&encoding=json`
        }

        // Start the websocket
        this.ws = new ws.Gateway(this.gateway, this.token, this.callbacks)
    }

    // channelID and limit are needed, returns a list of messages
    async ChannelMessages(channelID, limit, beforeID, afterID, aroundID) {
        let r = await this.fetcher.GETWithForm(
            endpoints.ChannelMessages(channelID),
            {
                limit: limit,
                after: afterID,
                before: beforeID,
                around: aroundID,
            },
        )

        let msgs = await r.json()
        return msgs
    }

    // returns the sent message
    async ChannelMessageSend(channelID, content, embed) {
        let data = {
            content: content,
        }

        if (embed) {
            data["embed"] = embed
        }

        let r = await this.fetcher.POSTWithBody(
            endpoints.ChannelMessages(channelID),
            data,
        )
        let m = await r.json()
        return m
    }
}
