//Robot Virtual Delivery Service Project


//   Class & roads  =====================================

const roads = [
"Alice's House-Bob's House", "Alice's House-Cabin",
"Alice's House-Post Office", "Bob's House-Town Hall",
"Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm",
"Grete's House-Shop", "Marketplace-Farm", "Marketplace-Post Office",
"Marketplace-Shop", "Marketplace-Town Hall", "Shop-Town Hall"
]

//defines mail route which passes every location.  
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

class VillageState {
	//creates object with current place and parcels
	constructor(place, parcels) {
		this.place = place
		this.parcels = parcels
	}
	
	//move to destination from current VillageState
	move(destination) {
		//if there is not a direct path to destination
		if (!roadGraph[this.place].includes(destination)) {
			return this
		}
		//otherwise, take direct path to destination
		else {
			
			//creates new parcels 
			let parcels = this.parcels.map(p => {
				//if parcel location is not with the robot, leave as is
				if (p.place != this.place) return p
				//otherwise, move parcels the robot has to the destination
				return {place: destination, address: p.address}
				
				//filters out packages that are delivered to current place
			}).filter(p => p.place != p.address)
			
			//returns village state at destination with new created parcel status
			return new VillageState(destination, parcels)
		}
	}
}

VillageState.random = function(parcelCount = 5){
	let parcels = []
	
	//creates random parcels 
	for (let i = 0; i < parcelCount; i++){
		let address = randomPick(Object.keys(roadGraph))
		let place
		//sets place randomly such that != address
		do {
			place = randomPick(Object.keys(roadGraph))
		} while (place == address)
		
		//adds parcel
		parcels.push({place, address})
	}
	//returns village state with all random parcels
	return new VillageState("Post Office", parcels)
}




//   Test Code     ========================================================


//creates graph data structure from roads array
const roadGraph = buildGraph(roads)

//start at post office with one parcel 
let first = new VillageState( "Post Office",
[{place: "Post Office", address: "Alice's House"}]
)
//move to alices house to deliver parcel
let next = first.move("Alice's House")

console.log("\nRandom Robot: ")
runRobot(VillageState.random(), randomRobot)

console.log("\nRoute Robot: ")
runRobot(VillageState.random(), routeRobot, [])

console.log("\nGoal Oriented Robot: ")
runRobot(VillageState.random(), goalOrientedRobot, [])




//   FUNCTIONS   =============================================

//                     Exercise 1 Compare Robots-------------------------------

console.log("\nExercise 1: Created compare robot function\n")
compareRobots(goalOrientedRobot, [], routeRobot, [])



function compareRobots(robot1, memory1, robot2, memory2){
	let turns1 = 0, turns2 = 0
	
	//creates tasks of 100 parcels to be delivered
	for (let i = 0; i < 100; i++){
		let state = VillageState.random()
	
		turns1 += testRobot(state, robot1, memory1)
		turns2 += testRobot(state, robot2, memory2)
	}
	
	//gets average turns per task
	turns1 /= 100
	turns2 /= 100
	
	//returns comparison
	if(turns1 < turns2){
		console.log(`\nRobot1 is faster, performing a task in ${turns1} turns on average,`,
		`compared to Robot2, performing a task in ${turns2} turns on average.`)
	}
	else if (turns1 > turns2){
		console.log(`\nRobot2 is faster, performing a task in ${turns2} turns on average,`,
		`compared to Robot1, performing a task in ${turns1} turns on average.`)
	}
	else{
		console.log(`\nBoth Robots performed at the same speed, at ${turns1} turns on average`)
	}
}
//returns turns taken by robot
function testRobot(state, robot, memory){
	//takes turns, breaks when no parcels are left
	for (let turn = 0; ; turn++){
		//return number of turns when done
		if(state.parcels.length == 0) return turn
		
		//make a move
		let action = robot(state, memory)
		state = state.move(action.direction)
		memory = action.memory
	}
}




//               Exercise 2 create more efficient robot ------------------

console.log("\nExercise 2: Robot 1 is my custom robot\n")
compareRobots(fasterRobot, [], goalOrientedRobot, [])

function fasterRobot({place, parcels}, route){
	//similar as goal oriented but always goes to closest parcel
	
	//builds route
	if (route.length == 0){
		//orders parcels by distance from location
		orderedParcels = orderParcels(place, parcels)
		//selects first parcel aka closest
		let parcel = orderedParcels[0]
		
		//find route to parcel current place if it isn't picked up yet
		if(parcel.place != place){
			route = findRoute(roadGraph, place, parcel.place)
		}
		//otherwise, find route to parsel delivery address
		else route = findRoute(roadGraph, place, parcel.address)
	}
	
	return {direction: route[0], memory: route.slice(1)}
}

function orderParcels(place, parcels){
	
	//sorts parcels based on distance
	return parcels.sort( (a, b) => {
		let aLen, bLen
		//define length of route to a and b pick up or drop off location
		if(a.place != place) aLen = findRoute(roadGraph, place, a.place).length
		else aLen = findRoute(roadGraph, place, a.address).length
		if(b.place != place) bLen = findRoute(roadGraph, place, b.place).length
		else bLen = findRoute(roadGraph, place, b.address).length
		
		//compare lengths, return -1 means a goes before b, 1 means opposite, 0 means equivalent
		if(aLen < bLen) return -1
		else if (aLen > bLen) return 1
		else return 0
	})
}



//----------------------------------------------------


function runRobot(state, robot, memory) {
	//takes turns, breaks when no parcels are left
	for (let turn = 0; ; turn++){
		if(state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`)
			break
		}
		
		//make a move
		let action = robot(state, memory)
		state = state.move(action.direction)
		memory = action.memory
		console.log(`Moved to ${action.direction}`)
	}
}


//robot which computes shortest route
function goalOrientedRobot({place, parcels}, route){
	//builds route
	if (route.length == 0){
		//selects first parcel
		let parcel = parcels[0]
		//find route to parcel current place if it isn't picked up yet
		if(parcel.place != place){
			route = findRoute(roadGraph, place, parcel.place)
		}
		//otherwise, find route to parsel delivery address
		else route = findRoute(roadGraph, place, parcel.address)
	}
	
	return {direction: route[0], memory: route.slice(1)}
}
//finds route to desired destination in least amount of moves
function findRoute(graph, from, to){
	
	let work = [{at: from, route: []}]
	
	for (let i = 0; i < work.length; i++){
		
		let {at, route} = work[i]
		//goes through all places that location is connected to
		for(let place of graph[at]){
			//if desired destination is connected to current location
			if (place == to) return route.concat(place)
			//otherwise, add place to route and list as current location
			if (!work.some(w => w.at == place)){
				work.push({at:place, route: route.concat(place)})
			}
		}
	}
}

//creates robot that follows defined mailroute for efficiency
function routeRobot(state, memory){
	//if memory is empty, set to defined mailRoute 
	if (memory.length == 0) memory = mailRoute
	//keeps on slicing off first item in array 
	return {direction: memory[0], memory: memory.slice(1)}
}


//randomly picks route 
function randomPick(array){
	let choice = Math.floor(Math.random() * array.length)
	return array[choice]
}
function randomRobot(state) {
	return {direction: randomPick(roadGraph[state.place])}
}


//function to create graph from roads array
function buildGraph(edges){
	
	//create empty object
	let graph = Object.create(null)
	
	//add edge to object
	function addEdge(from, to) {
		//if from location doesn't have any edges, add new array
		if (graph[from] == null){
			graph[from] = [to]
		}
		//otherwise, add to existing array
		else {
			graph[from].push(to)
		}
	}
	
	//adds edges in both directions for each item in array
	//takes array and splits at "-" to separate from and to
	for (let [from, to] of edges.map(r => r.split("-"))) {
		addEdge(from, to)
		addEdge(to, from)
	}
	
	return graph
}
