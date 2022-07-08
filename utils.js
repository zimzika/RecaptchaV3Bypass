module.exports = {
    parse_url(anchor_url) {
        const regex = /([api2|enterprise]+)\/anchor\?(.*)/u
        const match = anchor_url.match(regex);
        if (match) {
            return {
                endpoint: match[1],
                params: match[2]
            }
        }
    }
}