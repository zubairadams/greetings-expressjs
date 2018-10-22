let assert = require('assert');
let greetings = require('../greetings-factory');

describe('the greetings function', async function () {
    it('should return the name greeted in the langauge chosen', async function(){
        
        greetings.greet('zubair','english')

        assert.equal(hello , "zubair");
    })
});