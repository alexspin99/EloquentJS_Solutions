require('./scripts.js')



console.log("\nExercise 1: \n")

//Flatten array of arrays into a single array

let arr = [[1,2,3],[4,5,6],[7,8],[9,10]]
console.log(arr)

/*
callback function in reduce is defined to have parameters of flat and unflat
the arrow => with a statement after it, means the result of that statmenent is returned

The empty array is the 'starting point' of the flat argument

*/
console.log(arr.reduce((flat, unflat) => flat.concat(unflat), []))

//------------------------------------------------------------------------------

console.log("\nExercise 2: \n")

//Higher order function for loop

loop(3, n => n > 0, n => n - 1, console.log)

function loop(val, testF, update, body){
	
	for (let i = val; testF(i); i = update(i)){
		body(i)
	}
}

//--------------------------------------------------------------------------------

console.log("\nExercise 3: \n")

//everything 

console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));

function every(arr, testF){
	for(let elem of arr){
		if(!testF(elem)) return false
	}
	return true
}

//----------------------------------------------------------------------------------

console.log("\nExercise 4: \n")

//dominant writing direction

console.log(dominantDirection("Hello!"))
console.log(dominantDirection("Hey, مساء الخير"))

function dominantDirection(text){
	//counts direction of 
	let counted = countBy(text, char => {
		//declares what script the character is written in
		let script = characterScript(char.codePointAt(0))
		//if script is not undefined, return direction of its script, otherwise return "none"
		return script ? script.direction : "none"
	}).filter(({name}) => name != "none") //filters out count of undefined "none" 
	
	//sets default to ltr
	if (counted.length == 0) return "ltr"
	
	console.log(counted)
	
	//Reduces data to return the name of the script with the larger count
	return counted.reduce((a,b) => a.count > b.count ? a : b).name
}

//countBy and characterScript functions are provided by EloquentJS
//I added comments to better understand what they are doing

function countBy(items, groupName){
	let counts = []
	
	for (let item of items){
		
		//performs groupName callback function on item to recieve "group name"
		let name = groupName(item)
		
		//checks if an object exists with found name
		let known = counts.findIndex(c => c.name == name)
		
		//if name doesn't exist already, create new object
		if (known == -1) counts.push({name, count: 1})
		//otherwise add 1 to count in existing object
		else counts[known].count++
	}
	return counts
}

function characterScript(code) {
	
	//iterates through SCRIPTS, a dataset of different languages
	for (let script of SCRIPTS){
		//checks whether the code provided exists in the range of each script
		if (script.ranges.some(([from, to]) => {
			//returns true if code exists in script range
			return code >= from && code < to
		})) {
			//IF code exists in script, return script
			return script
		}
	}
	//if no match can be found
	return null
}



