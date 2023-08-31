const knownTime = require('./calculatedTime')
const expectedTime = require('./expectedTime')
const readline = require("readline");

function isObstructionImpenetrable() {
  // create object instances of the imported classes
  const alreadyCalculatedTime = new knownTime
  const timeToGetFromOnePointToAnother = new expectedTime

  // get user input about the spead and the distance
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("What is the speed of your machine? ", function(speed) {
    rl.question("Whats the distance between the locations ? ", function (distance) {
      // checks if the expected time is 1hr less than the already known time
      // note: the '+' sign before the 'speed' and 'distance' is to covert the user input to numbers for easier calculations
      if (alreadyCalculatedTime.getCalculatedTime() + 60 >= timeToGetFromOnePointToAnother.getExpectedTime(+speed, +distance)) {
        console.log('false, there are no obstructions');   
      } else {
         console.log('true, there are obstructions');
        }
      rl.close();
    });
  });
}
isObstructionImpenetrable() // false    
