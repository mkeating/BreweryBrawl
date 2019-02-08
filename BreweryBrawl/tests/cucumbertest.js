const assert = require('assert');
const webdriver = require('selenium-webdriver');
const browser = new webdriver.Builder()
    .usingServer()
    .withCapabilities({'browserName': 'chrome' })
    .build();

browser.get('http://en.wikipedia.org/wiki/Wiki');

browser.findElements(webdriver.By.css('[href^="/wiki/"]'))
    .then(function(links){
        assert.equal(19, links.length); // Made up number
        browser.quit();
    });

// Cucumber equivalent:
//Given I have opened a Web Browser
// When I load the Wikipedia article on "Wiki"
// Then I have "19" Wiki Links