const fetch = require('node-fetch');

class Logger {
    /**
     * @param {object} config
     * @param {string? } config.url
     * @param {string?} config.host
     * @param {string? } config.facility
     */
    constructor({ url = "http://localhost:12201/gelf", host = "example.org", facility = "" }) {
        url = require("url").parse(url);
        if (url.protocol === null || ['http:', 'https:'].indexOf(url.protocol) === -1 || url.host === null) {
            throw new URIError("URL is not valid");
        }
        this.configuration = {
            url,
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        };
        this.host = host;
        this.facility = facility;
        return this;
    }


    panic(message, extras) {
        return this.send(message, 0, extras)
    }

    alert(message, extras) {
        return this.send(message, 1, extras)
    }

    critical(message, extras) {
        return this.send(message, 2, extras)
    }

    error(message, extras) {
        return this.send(message, 3, extras)
    }

    warn(message, extras) {
        return this.send(message, 4, extras)
    }

    notice(message, extras) {
        return this.send(message, 5, extras)
    }

    info(message, extras) {
        return this.send(message, 6, extras)
    }

    debug(message, extras) {
        return this.send(message, 7, extras)
    }


    /**
     *
     * @param {string} message
     * @param {number} level
     * @param {object} extras
     * @return {Promise<{error, data}>}
     */
    async send(message, level, extras) {
        try {
            const data = {
                host: this.host || "example.org",
                facility: this.facility || "example.org",
                message: message,
                level,
                ...extras
            };

            this.configuration.body = JSON.stringify(data);
            const response = await fetch(this.configuration.url.href, this.configuration);
            return { data: response.status, error: '' };
        } catch (e) {
            // console.log("Error", e);
            return { data: '', error: e.message };
        }
    }

}

module.exports = Logger;