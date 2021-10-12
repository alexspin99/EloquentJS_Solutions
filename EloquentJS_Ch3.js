console.log("Example 1:\n")

//create minimum function, 2 arguments

let a = 5, b = 6

console.log("The minimum of " + a + " and " + b + " is " + min(5,6))

function min(a,b){
	if (a < b) return a
	else return b
}


console.log("Example 2:\n")

let num = -50
console.log(num + " is even? ")
console.log(isEven(num))

//recursion solution to even or odd 
function isEven(a){
	if (a == 0) return true;
	else if (a == 1) return false;
	else if (a < 0) return isEven(-a);
	else return isEven(a - 2);
}

console.log("Example 3:\n")

let s = "Bumblebees Become Boisterous Beecause"
console.log(countBs(s))

//Bean counting
function countBs(s){
	return countChar(s, 'B')
}

function countChar(s, c){
	let chars = 0
	for (let i = 0; i < s.length; i++){
		if (s[i] === c) chars++
	}
	return chars
}