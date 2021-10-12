
console.log("Example 1:\n")

let hashtag = "#"

//prints out triangle
for (let i = 0; i < 7; i++){
	console.log(hashtag + "\n")
	hashtag = hashtag + "#"
}


console.log("Example 2:\n")

//FizzBuzz coding question
for (let i = 1; i < 101; i++){
	
	switch (true){
		case (i % 3 == 0 && i % 5 == 0):
			console.log("FizzBuzz");
			break;
		case (i % 3 == 0):
			console.log("Fizz");
			break;
		case (i % 5 == 0):
			console.log("Buzz");
			break;
		default:
			console.log(i);
			break;
	}
}


console.log("Example 3:\n")

let Chessboard = "", width = 8, height = 8

//Creates chessboard of defined width and height 
for (let i = 0; i < height; i++){
	for (let j = 0; j < width; j++){
		if ((j + i) % 2 == 0) Chessboard = Chessboard + "#"
		else Chessboard = Chessboard + " "
	}
	Chessboard = Chessboard + "\n"
}

//prints chessboard
console.log(Chessboard);