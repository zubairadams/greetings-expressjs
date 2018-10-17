module.exports = function (pool) {

 async function greet(name, language) {
try{
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (name !== '' && language !== undefined) {

      let result = await pool.query('SELECT * FROM usersGreeted WHERE Username=$1', [name]);
      console.log(result)
      if (result.rowCount === 0) {
        await pool.query('INSERT into usersGreeted (Username, counter) values ($1, 1)', [name]);   
      } else {
        await pool.query('UPDATE usersGreeted SET counter = counter+1 WHERE Username=$1', [name]);   
      }

      if (language === 'xhosa') {
        return 'Molo ' + name
      }

      if (language === 'english') {
        return 'Hello ' + name
      }

      if (language === 'afrikaans') {
        return ' More ' + name
      }
    }
  } 

catch(error){
  console.error(error)
}
 }
  async function resetBtn() {
  //  let resetBtn = 
   await pool.query('DELETE FROM usersGreeted;');
    let name = '';
    let language = '';
    // return resetBtn;
  }


async function count() {
    let seeTable = await pool.query('SELECT id FROM usersGreeted');
    let namesCounted = seeTable.rowCount;
    return namesCounted;
  }
  async function Name() {
    let namesGreeted = await pool.query('SELECT * FROM usersGreeted;');
    return namesGreeted.rows;
  }
  async function persons(person){
    let users = await pool.query('SELECT * FROM usersGreeted WHERE Username=$1', [person]);
  // console.log('here',users.rows)
    return users.rows[0]
  }
  return {
    Name,
    count,
    greet,
    resetBtn,
    persons
  }

};