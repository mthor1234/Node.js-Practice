// In node.js, two equal signs only compares values. So a string and an int can return true if their values are the same
// Three equal signs compare types and values. So a String and int will return a false

console.log(19 == '19'); // True. Compare values
console.log(19 === '19'); //False. Compares values and type
