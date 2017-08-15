var Bucky = {
	favFood: "bacon",
	favMovie: "Chappie" 
};

var Person = Bucky;

Person.favFood = "salad";
console.log(Bucky.favFood);