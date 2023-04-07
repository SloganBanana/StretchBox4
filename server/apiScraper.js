//This is for populating the database... no need to run it anymore
function fetchApi(variable) {
  let muscleGroup = variable
  const options = {
    url: 'https://api.api-ninjas.com/v1/exercises?type=stretching&muscle=' + muscleGroup,
    headers: {
      'X-Api-Key': 'yPvp7DZtvxsNwvYebl/CbA==Qp9XuU0upuR0x5BD'
    }
  }

  function callback(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', body.statusCode, response.toString('utf8'));
    // request(options, callback)
    const exercises = JSON.parse(body)
  
    // console.log(exercises)
    //returnArr will contain the new objects that we want to add to the database
    let returnArr = []
    for (let i = 0; i < exercises.length; i++){
      const {name, muscle, instructions} = exercises[i]
      returnArr.push({
        name: name,
        muscle: muscle,
        instructions: instructions
      })
    }
    // iterate through returnArr to add each object to the database
    for (let i = 0; i < returnArr.length; i++){
      console.log(returnArr[i].name)
        // declare query text
      const text = `INSERT INTO stretches(name, ${returnArr[i].muscle}, instructions) VALUES($1, $2, $3)`;
      // declare the values
      const values = [returnArr[i].name, true, returnArr[i].instructions];
      // db query
      database
        .query(text, values)
        .then(response => {
          console.log('post response: done')
        })
        .catch(err => {
            console.error('saveStretch error');
        });
    }
    return returnArr;
    }
    //request is a specific way to call to this API
  request(options, callback, muscleGroup)
  // console.log(test);
} 

const muscleGroups = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps']
const databaseQuery = () => {
    for (let i = 0; i < muscleGroups.length; i++) {
      fetchApi(muscleGroups[i])
    }
    return
}
databaseQuery();