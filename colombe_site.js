By     = require('selenium-webdriver').By,
until  = require('selenium-webdriver').until;


var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


function publishEvent(url)
{
    return new Promise(function(resolve, reject){

        var eventUrl  =url;

        return driver.get(eventUrl).then(function(){
            return driver.findElement(By.name('login')).sendKeys('ljeanniard');
        }).then(function(){
            return driver.findElement(By.name('pass')).sendKeys('colombe');
        }).then(function(){
            return driver.findElement(By.name('submit')).click()

        }).then(function(){
            console.log("--------------------------------------------------")
            console.log("-> connected to " + eventUrl)
        }).then(function(){
            return driver.findElement(webdriver.By.xpath('//img[@title=\'Publier sur Colombe\']'))
                .then(function(webElement) {
                    webElement.click();
                    console.log('Element exists');
                }, function(err)
                {
                    if (err.state && err.state === 'no such element')
                        console.log('Element not found');
                    else
                        webdriver.promise.rejected(err);
                }
            );
        }).then(function(){
            return driver.findElement(By.linkText('Déconnexion'))
                .click()
                .then(function(){
                    console.log("-> disconnected")
                    console.log("--------------------------------------------------")
                    resolve();
                })
        })
    })
}

function quit(){
    return new Promise(function(){
        console.log("Quit Chrome")
        driver.quit().then(function(){
            return Promise.resolve();
        });
    });
}

module.exports.publishEvent = publishEvent;
module.exports.quit = quit;