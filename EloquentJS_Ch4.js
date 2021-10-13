console.log("\nExample 1: \n")
//Sum of a range

console.log(sum(range(10, 1)))

//returns array with range of values and step size specified
function range(start, end, step) {
	//defines step value to 1 or -1 if not specified
	if (step === undefined) {
		if (start < end) step = 1
		else step = -1
	}
	
	let nums = []
	
	if (step > 0){
		for (let i = start; i <= end; i+= step){
		nums.push(i)
		}
	}
	else {
		for (let i = start; i >= end; i+= step){
		nums.push(i)
		}
	}
	
	return nums
}

//returns sum of array inputted
function sum(nums){
	let sum = 0
	//special for loop to go through each array val
	for (let num of nums){
		sum += num
	}
	return sum
}



console.log("\nExample 2: \n")
//reverse array

let exArray = ["first", "Hello", 2, 53, true, "no", "last"]
console.log("Original array = \n" + exArray)

console.log("ReverseArray: \n" + reverseArray(exArray))

reverseArrayInPlace(exArray)
console.log("ReverseArrayInPlace: \n" + exArray)

function reverseArray(a){
	//creates new array
	let newArr = []
	
	//Adds items to front of newArr, reversing elems
	for (let elem of a) newArr.unshift(elem)

	return newArr
}

function reverseArrayInPlace(a){
	//modifies given array
	let swapIndex = a.length - 1, temp

	
	for (let index = 0; index < swapIndex; index++){
		temp = a[index]
		a[index] = a[swapIndex]
		a[swapIndex] = temp
		
		swapIndex--
	}
}


console.log("\nExample 3: \n")
//Array to List data structure

//creates array
let arr = [1, 2, 3]
console.log("Original Array: " + arr)

//converts to a list
arr = arrayToList(arr)
console.log("Convert to List: ")
console.log(arr)
console.log("Recieve values using nth function: " + nth(0, arr) + nth(1, arr) + nth(2, arr))


//converts back to an array
arr = listToArray(arr)
console.log("Convert back to Array: " + arr)


function arrayToList(a){
	let list, elem
	//adds elements from last to first
	for (let i = a.length - 1; i >= 0; i--) {
		elem = a[i]
		list = prepend(elem, list)
	}
	return list
}

function listToArray(l){
	let arr = []
	//iterates through list and stores values in an array
	for (let node = l; node; node = node.rest){
		arr.push(node.value)
	}
	return arr
}

//adds elem to front of list
function prepend(elem, list){
	return newList = {value: elem, rest: list}
}

//returns elem at index
function nth(index, list){
	if (list === undefined) return
	else if (index == 0) return list.value
	else return nth(index - 1, list.rest)
}



console.log("\nExample 4: \n")
//Deep comparison, compares by properties if both arguments are objects

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true


function deepEqual(a, b){
	
	//checks that both arguments are actual objects
	if ((typeof(a) == 'object' && a != null) && (typeof(b) == 'object' && b != null)) {
		//compare by properties
		let aKeys = Object.keys(a), bKeys = Object.keys(b)
		
		
		//check they have the same # of properties
		if (aKeys.length != bKeys.length) return false
		
		// uses recursion so it gets to level where the key being returned is not an object
		for (let key in a) if (!deepEqual(a[key], b[key])) return false
		
		//returns true if it makes it past the previous return statements 
		return true
		
	}
	else return a === b
}

