
//Class group 
class PGroup {
	
	constructor (val) {
		this.items = val
	}
	//add, delete, has methods
	
	add(val){
		if (!this.has(val)) return new PGroup(this.items.concat(val))
		return this
	}
	
	delete(val){
		return new PGroup(this.items.filter(a => a !== val))
	}
	
	has(val) {
		return this.items.includes(val)
	}
}

PGroup.empty = new PGroup([])


//TEST -------------
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));
