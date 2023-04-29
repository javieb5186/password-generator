// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  // Declarations
  const charTypes = [];
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
    'w', 'x', 'y', 'z'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const special = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', 
    '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

  // Initiate contact
  let lengthResponse = window.prompt("Choose a number between 8 and 128");

  // If number is not detected, alert to user, return null, and ignore preceding code. 
  if(isNaN(lengthResponse)) {
    window.alert("Please type a number");
    return null;
  }
  else {
    // If number is detected, make sure it's between 8 - 128, if not, alert to user, return null, and ignore preceding code. 
    if(lengthResponse < 8 || lengthResponse > 128) {
      window.alert("Please choose a number between 8 and 128.");
      return null;
    }
    else {
      // If everything passes, ask for character types.
      let lowercaseResponse = window.confirm("Do you want lowercase?");
      if (lowercaseResponse)
        charTypes.push(alphabet);

      let uppercaseResponse = window.confirm("Do you want uppercase?")
      if(uppercaseResponse)
        if(!charTypes.includes(alphabet))
          charTypes.push(alphabet);
        else
          console.log("Alphabet already added");
  
      let numericResponse = window.confirm("Do you want numbers");
      if(numericResponse)
        charTypes.push(numbers);
  
      let specialCharResponse = window.confirm("Do you want special characters?")
      if (specialCharResponse)
        charTypes.push(special);
      
      // If there are character types selected, then continue to create password and return final outcome.
      if(charTypes.length > 0) {
        var finalPassword = createPassword(lengthResponse, charTypes, uppercaseResponse, lowercaseResponse);
        return finalPassword;
      }
      else { // If there are no character types selected, alert user, return null. 
        window.alert("Please try again. Make sure to select one character type");
        return null;
      }
    }
  }
}

// A function that takes in a passed lenght, array, upper case response, and lower case response. 
function createPassword(rLength, cList, upResponse, lowResponse) {
  // Declarations
  console.log(cList);
  const passphrase = [];
  var randomChoice, randomSelection, anotherChoice;

  // Loop however many specified by user
  for (let i = 0; i < rLength; i++) 
  {
    randomChoice = Math.floor(Math.random() * cList.length);
    randomSelection = Math.floor(Math.random() * cList[randomChoice].length);

    // Depending on response, make letter upper case or lower case. 
    if(cList[randomChoice].length === 26) {

      if(upResponse && lowResponse) {
        anotherChoice = Math.floor(Math.random() * 2);

        if(anotherChoice === 0) 
          passphrase.push(cList[randomChoice][randomSelection]);
        else if(anotherChoice === 1) 
          passphrase.push(String(cList[randomChoice][randomSelection]).toUpperCase());
      }
      else if (upResponse)
        passphrase.push(String(cList[randomChoice][randomSelection]).toUpperCase());
      else
        passphrase.push(cList[randomChoice][randomSelection]);
    }
    else
      passphrase.push(cList[randomChoice][randomSelection]);

  }

  // After everything, make the array a string and return as output.
  var finalPassphrase;

  for (let i = 0; i < passphrase.length; i++) 
    finalPassphrase = passphrase.join("");

  return finalPassphrase;
}
