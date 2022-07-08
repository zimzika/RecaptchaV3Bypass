const axios = require('axios');
const url = require('url');

class Session {
    constructor(base_url, base_headers) {
        this.base_url = base_url;
        this.session = axios.create({
            baseURL: base_url,
            headers: base_headers
        });
    }
    async send_request(endpoint, data, params) {
        let response = "";
        try {
            if (data) {
                if (params) {
                    response = await this.session.post(`${endpoint}?${params}`, {
                        data,
                    });
                } else {
                    response = await this.session.post(endpoint, {
                        data
                    });
                }
            } else {
                // console.log(params);
                response = await this.session.get(`${endpoint}?${params}`);
            }
        } catch (e) {
            console.error(e);
        }
        return response ? response.data : null;
    }
}

module.exports = Session;