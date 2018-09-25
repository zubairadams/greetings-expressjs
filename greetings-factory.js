module.exports = function (pool) {

  async function greet(name, language) {

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (name !== '' && language !== undefined) {

      let result = await pool.query('SELECT * FROM greeteduser WHERE username=$1', [name]);
      console.log("after select");


      if (result.rowCount === 0) {

        await pool.query('INSERT into greeteduser (username, counter) values ($1, 1)', [name]);
        console.log("after insert");
      } else {

        await pool.query('UPDATE greeteduser SET counter = counter+1 WHERE username=$1', [name]);
      
      }

      if (language === 'xhosa') {
        return 'Molo ' + name
      }

      if (language === 'english') {
        return 'Hello ' + name
      }

      if (language === 'afrikaans') {
        return 'More ' + name
      }

      if (language === 'seSotho') {
        return 'Dumela ' + name
      }
    }
  }




  async function resetBn() {


    let resetBtn = await pool.query('DELETE FROM greeteduser');
    name = '';
    language = '';
    return resetBtn.rowCount;
  }

  async function count() {

    let seeTable = await pool.query('SELECT id FROM greeteduser');
    let namesCounted = seeTable.rowCount;
    console.log(seeTable);

    return namesCounted;
  }

  async function names() {

    let namesGreeted = await pool.query('SELECT * FROM greeteduser');
    return namesGreeted.rows;
  }



  return {
    names,
    count,
    greet,
    resetBn
  }
};