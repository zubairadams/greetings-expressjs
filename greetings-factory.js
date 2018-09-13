module.exports = function () {

  function Rest(){
    name = "";
  language = '';
  namesGreeted = {};
  count = 0;  
  }

  function greetings(name,language){

      if (language === 'xhosa') {
        return 'Molo ' + name
      }

      if (language === 'english') {
        return 'Hello ' + name
      }

      if (language === 'afrikaans') {
        return 'Sogends ' + name
      }
    
  }
   function count() {
    console.log(nameEntered)
    return nameEntered;
  }
  return {
    Rest,
    greetings,
    count
  }
};

