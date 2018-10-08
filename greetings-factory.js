module.exports = function (pool) {

  // async
   function greet(name, language) {

    // name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // if (name !== '' && language !== undefined) {

    //   let result = await pool.query('SELECT * FROM users WHERE username=$1', [name]);
     


    //   if (result.rowCount === 0) {

    //     await pool.query('INSERT into users (username, counter) values ($1, 1)', [name]);
       
    //   } else {

    //     await pool.query('UPDATE users SET counter = counter+1 WHERE username=$1', [name]);
      
    //   }

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
  




  // async
   function resetBtn() {


    // let resetBtn = await pool.query('DELETE FROM users');
    let = name = '';
    let = language = '';
    return resetBtn;
  }

  //async
   function count() {

    // let seeTable = await pool.query('SELECT id FROM users');
    // let nameCounted = seeTable.rowCount;

    return nameCounted;
  }

  // async function Name() {

  //   let namesGreeted = await pool.query('SELECT * FROM users');
  //   return namesGreeted.rows;
  // }



  return {
    // Name,
    count,
    greet,
    resetBtn
  }
};