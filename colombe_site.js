By     = require('selenium-webdriver').By,
until  = require('selenium-webdriver').until;

function publishEvent(url)
{


    var eventUrl  =url;

    var webdriver = require('selenium-webdriver');
    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    driver.get(eventUrl);
    driver.findElement(By.name('login')).sendKeys('ljeanniard');
    driver.findElement(By.name('pass')).sendKeys('colombe');
    driver.findElement(By.name('submit')).click();


    driver.findElement(webdriver.By.xpath('//img[@title=\'Publier sur Colombe\']')).then(function(webElement) {
        webElement.click();
        console.log('Element exists');
    }, function(err) {
        if (err.state && err.state === 'no such element') {
            console.log('Element not found');
        } else {
            webdriver.promise.rejected(err);
        }
    });

    driver.findElement(By.linkText('Déconnexion')).click();
    driver.quit();
}

module.exports.publishEvent = publishEvent;
