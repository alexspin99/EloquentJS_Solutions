console.log("\nExample 1: \n")

//vector class type
class Vec {
	constructor(x, y){
		this.x = x
		this.y = y
	}
	
	//getters
	length(){return Math.sqrt( (this.x**2) + (this.y**2) )}
	
	//methods
	plus (vec2){return new Vec(this.x + vec2.x, this.y + vec2.y)}
	
	minus(vec2){return new Vec(this.x - vec2.x, this.y - vec2.y)}
}

//test
let v1 = new Vec(5, 5)
let v2 = new Vec(1, 4)

console.log("v1:", v1.x, v1.y)
console.log("v2:", v2.x, v2.y)
console.log("Length of v1 is is", v1.length())
console.log("Length of v2 is is", v2.length())

let sum = v1.plus(v2)
let sub = v1.minus(v2)

console.log("Sum is", sum)
console.log("Subtraction is", sub)



//---------------------------------------------------------------------

console.log("\nExample 2: \n")

//groups class, similar to predefined Set class which doesn't allow duplicates

class Group{
	constructor(){this.items = []}
	
	add(x){
		if (!this.has(x)){this.items.push(x)}
	}
	
	delete(x){
		if (this.has(x)){this.items = this.items.filter(val => val != x)}
	}
	has(x){
		return this.items.includes(x)
	}
	
	static from(i){
		let newGroup = new Group()
		for(let item of i){newGroup.add(item)}
		return newGroup
	}
}

let group = Group.from([10, 20])
console.log("Group created from array with 10 and 20")

console.log("Group contains 10?", group.has(10))
console.log("Group contains 30?", group.has(30))

group.add(10)
group.delete(10)
console.log("10 was deleted from group")
console.log("Group contains 10?", group.has(10))

//------------------------------------------------------------------

console.log("\nExample 3: \n")

//makes group class from ex.2 iterable

class GroupIterator {
	constructor(group){
		this.group = group
		this.position = 0
	}
	
	next() {
		if(this.position >= this.group.items.length){return {done: true}}
		else{
			let result = {value: this.group.items[this.position], 
			done: false}
			this.position++
			return result
		}
		
	}

}

Group.prototype[Symbol.iterator] = function() {
	return new GroupIterator(this)
}

console.log("Iterates through Group containing [1,2,3,4,5]")
for (let item of Group.from([1, 2, 3, 4, 5])){console.log(item)}


//-------------------------------------------------------------------

console.log("\nExample 4: \n")

//calling hasOwnProperty if hasOwnProperty is in object 

let object = {hasOwnProperty: false, food: "taco"}
console.log("object", object)

//you can access the function through the Object class prototype
console.log(Object.prototype.hasOwnProperty.call(object, "hasOwnProperty"))

