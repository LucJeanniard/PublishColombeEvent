var colombeSite = require('./colombe_site.js')

var google = require('googleapis');

function listCCBEMails(auth) {
    var gmail = google.gmail('v1');
    gmail.users.messages.list({
        auth: auth,
        userId: 'me',
        q: '[CCBE Invitation] after:2015/07/01',
        maxResults : '100'
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log(response);
        var messages = response.messages;
        console.log(messages.length);
        for (var i = 0; i < messages.length; i++) {
            var id = messages[i].id;

            gmail.users.messages.get({
                auth: auth,
                userId: 'me',
                id: id,
                format: 'full'
            }, function(err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }
                console.log('--------------------------------');

                var base64 = require('js-base64').Base64;
                var bodyData = response.payload.parts[0].body.data;
                var body = base64.decode(bodyData.replace(/-/g, '+').replace(/_/g, '/'));

                var regex_str =  "http:\/\/www.colombe.fr\/administration\/.*";
                var match = body.match(regex_str);
                var url = match[0];
                console.log(url);

                colombeSite.publishEvent(url);
           });
        }
    });
}

module.exports.listCCBEMails = listCCBEMails;
