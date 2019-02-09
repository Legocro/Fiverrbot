const base = "api.giphy.com";
const endpoint = "/v1/gifs/search";
const request = require("superagent");


exports.cmd = (Client, m, args) => {
    request
        .get(base + endpoint)
        .query({ "api_key": "q3JCG5844xZUAymAE8zuftRkci18v0sf" })
        .query({ "q": "unicorn" })
        .then(response => {
            let length = response.body.data.length;
            let index = Math.floor(Math.random() * length);
            m.channel.send(response.body.data[index].url);
        })
}
exports.config = {
    permlevel: 0
}