
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
	for (let [from, to] of edges) {
		addEdge(from, to)
		addEdge(to, from)
	}
	
	return graph
}

module.exports = buildGraph