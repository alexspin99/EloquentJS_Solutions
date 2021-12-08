//Exercise 1

/*
If I were to write the Chapter 7 Project as a modular program I would create a module
for the map (and its functions) and for the robot (and its functions).
This would allow for the code to be consise and for the map to be reuseable for other programs,
in addition to the robot not being tied to the specific map we are using.
*/


//Exercise 2

//CommonJS module containing array of roads and exports data structure
//Depends on ./graph to use buildGraph functions

const {buildGraph} = require("./graph")

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

//exports a graph using the ./graph dependency to build it
//has to format the roads array to fit the way the ./graph dependency works
exports.roadGraph = buildGraph(roads.map(item => item.split("-")))



//Exercise 3

/*
Using circular dependencies in CommonJS modules could run into an issue when 
a module replaces its default exports object because of the way that dependencies are loaded.
In a circular dependency, before the first module is loaded it adds the second module to the cache.
Due to this, if the default export object is replaced, it can cause a mismatch error where the export is not
fully loaded and the default interface object will be passed, instead of the desired one
*/

