//Example 1 -------------------

console.log("\nExercise 1\n")
console.log("Should output nothing if all regexp's are correct")

//create RegEx expressions as short as possible based on conditions

function verify(regexp, yes, no){
	if (regexp.source == "...") return;
	
	for (let str of yes) if (!regexp.test(str)){ ''
		console.log(`Failure to match '${str}'`)
	}
	for (let str of no) if (regexp.test(str)){
		console.log(`Unexpected match for '${str}'`)
	}
}

//car or cart
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

//pop or prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

//ferret or ferry or ferrari
verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

//word ending in ious
verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

//whitespace followed by . , : or ;
verify(/\s[.,:;]/,
       ["bad punctuation ."],
       ["escape the period"]);

//longer than 6 letter word
verify(/\w{8,}/,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

//word without e or E
verify(/\b[^\We]+\b/i,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);
	   

//Example 2 -------------------------------------------
console.log("\nExample 2\n")

//replace all single quotations with double quotations, leaving all contractions like aren't

let text = "'I'm the cook,' he said, 'it's my job.'"

console.log(text.replace(/(^|\W)'|'(\W|$)/g, "$1\"$2"))

//Example 3 ---------------------------------------------
console.log("\nExample 3\n")
console.log("Should output nothing if the regex is correct")

//accept only javascript style numbers

let number = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/

//+/- num.num e+/-4

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`)
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`)
  }
}


