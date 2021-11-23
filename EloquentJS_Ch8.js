
// Example 1 --------------------------------------------

console.log("\nExample 1\n")

class MultiplicationUnitFailure extends Error{}

function primitiveMultiply(a,b){
	if (Math.random() < 0.2) {
		return a * b 
	}
	else throw new MultiplicationUnitFailure("Klunk")
	
}

function reliableMultiply(a,b){
	//keeps on calling primitiveMultiply until it succeeds
	
	try {
		return primitiveMultiply(a,b)
	}
	catch (error) {
		console.log("Whoops, gotta try again!")
		if (error instanceof MultiplicationUnitFailure) return reliableMultiply(a,b)
		else throw error
	}
}


console.log(reliableMultiply(5,3))


// Example 2 ---------------------------------------------

console.log("\nExample 2\n")

//box object with a lock
const box = {
	locked: true,
	unlock() {this.locked = false},
	lock() {this.locked = true},
	_content: [],
	get content() {
		if (this.locked) throw new Error("Locked!")
		return this._content
	}
}


function withBoxUnlocked(body){
	let boxAlreadyUnlocked = false
	
	//unlocks box
	if (box.locked == true) box.unlock()
	else boxAlreadyUnlocked = true
	
	//runs function
	try{
		body()
	}
	finally{
		//locks box if it was locked previous to function call
		if (!boxAlreadyUnlocked) box.lock()
	}
}
	
	


withBoxUnlocked(function() {
	box.content.push("gold piece")
})

try {
	withBoxUnlocked(function() {
		throw new Error("Pirates on the horizon! Abort!")
	})
}
catch (e) {
	console.log("Error raised: " + e)
}

console.log(box.locked)



