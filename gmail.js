var google = require('googleapis');

function extractUrlFromMessage(message){

    var base64 = require('js-base64').Base64;
    var bodyData = message.payload.parts[0].body.data;
    console.log("bodyData = " + bodyData)
    try{
        var body = base64.decode(bodyData.replace(/-/g, '+').replace(/_/g, '/'));

        var regex_str = "http:\/\/www.colombe.fr\/administration\/.*";
        var match = body.match(regex_str);
        var url = match[0];

    } catch (e) {
        console.log("ERROR in extractUrlFromMessage : " + e.message)
        url = "";
    }
    return url
}

function listCCBEMails(auth) {
    return new Promise(function(resolve, reject)
    {
        console.log("Hello1");

        var gmail = google.gmail('v1');

        console.log("Hello2");

        gmail.users.messages.list({
            auth: auth,
            userId: 'me',
            q: '[CCBE Invitation] after:2015/07/01',
            maxResults: '100'
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            console.log("Hello");

            console.log(response);
            var messages = response.messages;
            console.log(messages.length);

            var urlsPromise = []
            var urls = []

            for (var i = 0; i < messages.length; i++) {
                urlsPromise.push(

                    new Promise(function(resolve){

                        var id = messages[i].id;

                        gmail.users.messages.get({
                            auth: auth,
                            userId: 'me',
                            id: id,
                            format: 'full'
                        }, function (err, response) {
                            if (err) {
                                console.log('The API returned an error: ' + err);
                                return;
                            }
                            console.log('--------------------------------');

                            var url = extractUrlFromMessage(response)
                            console.log(url);
                            urls.push(url)
                            resolve();
                    });
                }))
            }

            Promise.all(urlsPromise).
                then(function(){
                    console.log('will resolve');
                    resolve(urls)
            })
        });
    })
}

module.exports.listCCBEMails = listCCBEMails;
