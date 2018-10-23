let assert = require('assert');
let greetings = require('../greetings-factory');
const pg = require('pg');
const Pool = pg.Pool;
let indi = require('../index');
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});
var ob = greetings(pool);
describe('basic app testing', function () {

    beforeEach(async function () {
 
        await pool.query("delete from usersGreeted;");
    });
it('should greet a person in the language selected.', async function () {

    // var ob = greetings(pool);
    var greetings = await ob.greet('bud', 'english')
    var greetings2 =  await ob.greet('cobus', 'afrikaans')

    assert.equal(greetings2,' More Cobus')
    assert.equal(greetings,'Hello Bud')
});
it('should return Number of names greeted',async function() { 

var number = {
 greetings : await ob.greet('bud', 'english'),
 greetings2 : await ob.greet('cobus', 'afrikaans')
}
 var number2 = await ob.count(number)
 assert.equal(number2,2)
})
it("should return the error message",async function(){
 
    var error = {
        greetings : await ob.greet('', ' '),
 greetings2 : await ob.greet('', '')
    } 
 
})
it("should reset all names in the data base ", async function(){
    var number = {
        greetings : await ob.greet('bud', 'english'),
        greetings2 : await ob.greet('cobus', 'afrikaans')
       }
       var number2 = await ob.count(number);
       var resets = await ob.resetBtn();
       assert.equal(number2,2);
       assert.equal(resets,)
    })
});