var fs = require('fs')
var googleApi = require('./google_api.js')
var gmail = require('./gmail.js')

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    googleApi.authorize(JSON.parse(content), gmail.listCCBEMails);
});
