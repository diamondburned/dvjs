"use strict"

export class Fetcher {
    constructor() {
        this.retryAfter = 0
    }

    async acquire(headers) {
        // If there's an existing retryAfter
        if (this.retryAfter) {
            // We don't set retryAfter to 0, we let the background timeout
            // callback to set it.
            return new Promise(c => setTimeout(() => c(false), this.retryAfter))
        }

        // If it's already too late...
        let wait = headers["Retry-After"]
        if (wait) {
            this.retryAfter = parseInt(wait)
            return new Promise(c =>
                setTimeout(() => {
                    this.retryAfter = 0
                    c(false)
                }, this.retryAfter),
            )
        }

        return true
    }

    async Fetch(url, opts) {
        let r = await fetch(url, opts)

        for (;;) {
            if (await this.acquire(r.headers)) {
                break
            }
        }

        return r
    }

    async Request(method, url, opts) {
        if (!opts) {
            return this.Fetch(url, {
                method: method,
            })
        }

        return this.Fetch(
            url,
            Object.assign(opts, {
                method: method,
            }),
        )
    }

    async RequestJSON(method, url, opts) {
        let r = await this.Request(method, url, opts),
            j = await r.json()

        return j
    }

    async POSTWithBody(url, bodyObject) {
        return this.Request("POST", url, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObject),
        })
    }

    async GETWithForm(url, form, opts) {
        let fields = []
        for (const [k, v] of Object.entries(v)) {
            if (!v) {
                continue
            }

            fields.push(encodeURIComponent(k) + "=" + encodeURIComponent(v))
        }

        return this.Request("GET", url + "?" + fields.join("&"), opts)
    }
}
