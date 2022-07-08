const { BASE_HEADERS, BASE_URL, POST_DATA } = require('./constants');
const Session = require('./session');
const { parse_url } = require('./utils');

class reCaptchaV3 {
    constructor(anchor_url) {
        this.anchor_url = anchor_url;
        this.session = new Session(BASE_URL, BASE_HEADERS);
        this.data = parse_url(anchor_url);
        this.params = new Map();
        this.data.params.split('&').forEach(param => {
            const [key, value] = param.split('=');
            this.params.set(key, value);
        });
    }
    async get_recaptcha_token() {
        this.token = await this.#get_recaptcha_token(this.data.endpoint, this.data.params);
        const post_data = `v=${this.params.get('v')}&reason=q&c=${this.token}&k=${this.params.get('k')}&co=${this.params.get('co')}${POST_DATA}`;
        this.recaptcha_response = this.#get_recatcha_tokend(this.data.endpoint, post_data, this.data.params);
        return this.recaptcha_response;
    }
    async #get_recatcha_tokend(endpoint, data, params) {
        const response = await this.session.send_request(`${endpoint}/reload`, data, params);
        if (!response) {
            throw new Error('No recaptcha response found');
        }
        const re = /"rresp","(.*?)"/g;
        const hits = [];
        // Iterate hits
        let match = null;
        do {
            match = re.exec(response);
            if (match) {
                hits.push(match[1]);
            }
        } while (match);
        if (!hits[0]) {
            throw new Error('No recaptcha response found');
        }
        return hits[0];
    }
    async #get_recaptcha_token(endpoint, params) {
        const response = await this.session.send_request(`${endpoint}/anchor`, null, params);
        if (!response) {
            throw new Error('No recaptcha token found');
        }
        const re = /"recaptcha-token" value="(.*?)"/g;
        const hits = [];
        // Iterate hits
        let match = null;
        do {
            match = re.exec(response);
            if (match) {
                hits.push(match[1]);
            }
        } while (match);
        if (!hits[0]) {
            throw new Error('No recaptcha token found');
        }
        return hits[0];
    }
}

module.exports = reCaptchaV3;