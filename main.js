var fs = require('fs')
var googleApi = require('./google_api.js')
var gmail = require('./gmail.js')
var colombeSite = require('./colombe_site.js')

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    return googleApi.authorize(JSON.parse(content))
        .then(function(auth){
            return gmail.listCCBEMails(auth)
        })
        .then(function(urls){
            var publishActions = []

            for(var i=0; i<urls.length; i++){
                if(urls[i] != ""){
                    publishActions.push(colombeSite.publishEvent(urls[i]))
                }
            }

            return Promise.all(publishActions)
        })
        .then(function(){
            return colombeSite.quit()
        })

});
