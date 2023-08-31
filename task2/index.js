class CascadingPalindrome {
    checkPalindrome = (input) => {
      if (input.length === 0) return "input must not be empty!";
      if (typeof input !== "string") return "input type must be a string!";
      const arr = input.toLowerCase().split(" "); // convert the string input into an array with every word in lowercase
      console.log(arr);
      let result = "";
      for (let word of arr) { // loop through the array
        const re = /[\W_]/g; // regex to check for special characters
        word = word.replace(re, ""); // removes special characters
        const len = word.length;
        if (len < 2) return "each length must be at least 2";
        let isPalindrome = true;
        for (let i = 0; i < len / 2; i++) { // iterate through each character in every word of the array
          if (word[i] !== word[len - 1 - i]) { // checks if letters on the right and left are the same
            isPalindrome = false;
            break; // if false, no need for further checks
          }
        }
        if (isPalindrome) result += word + " "; // append the found palindrome to the result string
      }
      if (result === "") return "no palindrome found in the input";
      return result.trim(); // removes whitespaces at the end
    };
  }
  
  // testing different case scenarios and their responses
  const example1 = new CascadingPalindrome();
  console.log(example1.checkPalindrome("")); // input must not be empty
  console.log(example1.checkPalindrome("art ward")); // no palindrome found in the input
  console.log(example1.checkPalindrome(123031)); // input type must be a string
  console.log(example1.checkPalindrome(["1230321"])); // input type must be a string
  console.log(example1.checkPalindrome("123;03,21")); // 1230321
  console.log(example1.checkPalindrome("1230---321 0124210")); // 1230321 0124210
  console.log(example1.checkPalindrome("MAd_*a'm, arsenal")); // madam
  console.log(example1.checkPalindrome("abcd5dcba 1230321 09234 0124210")); // abcd5dcba 1230321 0124210
  console.log(example1.checkPalindrome({})); // input type must be a string
  console.log(example1.checkPalindrome("a")); // each length must be at least two
  