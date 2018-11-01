window.onload = setup;
var $win = $(window);
var $lay = $('#layout');
var baseSize = {
	w: 720,
	h: 500
}
var currentRunes = 0;
var totalRunes = 0;
var combinations = 0;
var totalRecipes = 0;
var time = 0;
var date;
var altarMultiplier = 1;
var combineMultiplier = 1;
var currentScreen = "tutorial";
var prevScreen = "altar";
var selected = 0;
var autoSelected = 0;
var maxSelected = 2;
var highestRune = 0;
var combineX = 1;
var combineArray = [];
var autoCombineArray = [];
var autoCombine0;
var autoCombine1;
var recipes = [];
var failedRecipes = [];
var recipeFails = 0;
var baseRps = 0;
var rps = 0;
var autoCombining = false;
var autoSpeed = 1;
var combineBase = 0;
var baseRune = 0;
var critChance = 0;
var critMult = 2;
var presentMult = 5;
var fading = false;
var fading2 = false;
var fading3 = false;
var messages = [];
var messages2 = [];
var tooltipsOn = true;
var tutorialEnabled = true;

var allRecipes = [];
var increaseCombineMult = [];	//3, 15, 60, 180	3-4
var increaseAltarMult = [];		//3, 15, 60, 180	3-4
var increaseRps = [];			//3, 30, 120, 360	3-4
var increaseAutoSpeed = [];		//5, 50, 200, 600	2-4
var increaseCombineBase = [];	//2, 4, 6, 8		4
var increaseBaseRune = [];		//1, 3, 5, 7		4
var increaseCritChance = [];	//5, 10, 25, 50		2-4
var increaseCritMult = [];		//1, 10, 40, 120	4
var increasePresentMult = [];	//1, 3, 5, 7		4
var givePresents = [];			//10, 100, 400, 1200 2-4
var hints = [];
hints.push("0+1+2+3");

//Store all the default recipes
for (i = 0; i < 24; i++) {
	allRecipes.push(i + "+" + i);
	allRecipes.push(i + "+" + i + "+" + i);
	increaseAltarMult.push(i + "+" + i + "+" + i);
	allRecipes.push(i + "+" + i + "+" + i + "+" + i);
	increaseCombineMult.push(i + "+" + i + "+" + i + "+" + i);
	allRecipes.push(i + "+" + (i + 1));
	increaseRps.push(i + "+" + (i + 1));
}
allRecipes.pop();
increaseRps.pop();
allRecipes.push("0+1+2+3");

//Randomize some recipes!
//Recipes using runes 0-5
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAltarMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAltarMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseRps.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseRps.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineBase.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseBaseRune.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 1; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increasePresentMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 4; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}
for (i = 0; i < 4; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6); //0 to 5
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}


//Recipes using runes 0-11
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 5; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAltarMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 5; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAltarMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 20; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseRps.push(newRecipe);
	} else i--;
}
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseRps.push(newRecipe);
	} else i--;
}
for (i = 0; i < 20; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 20; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 4; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineBase.push(newRecipe);
	} else i--;
}
for (i = 0; i < 3; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseBaseRune.push(newRecipe);
	} else i--;
}
for (i = 0; i < 4; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 4; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 2; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 3; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increasePresentMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}
for (i = 0; i < 20; i++) {
	var r1 = Math.floor(Math.random() * 6) + 6; //6 to 11
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}


//Recipes using runes 0-17
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 20; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAltarMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 20; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAltarMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 80; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseRps.push(newRecipe);
	} else i--;
}
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 117
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseRps.push(newRecipe);
	} else i--;
}
for (i = 0; i < 80; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 80; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseAutoSpeed.push(newRecipe);
	} else i--;
}
for (i = 0; i < 6; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCombineBase.push(newRecipe);
	} else i--;
}
for (i = 0; i < 5; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseBaseRune.push(newRecipe);
	} else i--;
}
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 10; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 5; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritChance.push(newRecipe);
	} else i--;
}
for (i = 0; i < 40; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increaseCritMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 5; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		increasePresentMult.push(newRecipe);
	} else i--;
}
for (i = 0; i < 160; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var r4 = Math.floor(Math.random() * (r3 + 1)); //0 to r3
	var newRecipe = r4 + "+" + r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}
for (i = 0; i < 160; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var r3 = Math.floor(Math.random() * (r2 + 1)); //0 to r2
	var newRecipe = r3 + "+" + r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}
for (i = 0; i < 80; i++) {
	var r1 = Math.floor(Math.random() * 6) + 12; //12 to 17
	var r2 = Math.floor(Math.random() * (r1 + 1)); //0 to r1
	var newRecipe = r2 + "+" + r1;
	if (!allRecipes.includes(newRecipe)) {
		allRecipes.push(newRecipe);
		givePresents.push(newRecipe);
	} else i--;
}




function setup() {
	loadGame();
}

function makeRune(num, base) {
	if (base == undefined) base = baseRune;
	if (base > 0) makeRune(num, base - 1); //Yay recursion!
	var runeID = base;
	
	var id = "rune" + runeID;
	var elem = document.getElementById(id);
	if (elem.getAttribute("value") == null) {
		elem.setAttribute("src", "images/rune0.png");
		elem.setAttribute("value", 0);
		if (tooltipsOn) document.getElementById("text0").classList.remove("hidden");
	}
	var moreRunes = Math.round(num / altarMultiplier);
	if (moreRunes == 0) moreRunes = 1;
	currentRunes += altarMultiplier * moreRunes;
	totalRunes += altarMultiplier * moreRunes;
	var val = parseInt(elem.getAttribute("value"));
	elem.setAttribute("value", val + (altarMultiplier * moreRunes));
	id = "numRune" + runeID;
	document.getElementById(id).innerHTML = enumerate(elem.getAttribute("value"));
	document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
	
	if (totalRunes == 10) {
		document.getElementById("combine").style.display = "inline";
		document.getElementById("combine").style.backgroundColor = "yellow";
		document.getElementById("combine").style.borderColor = "yellow";
		if (tutorialEnabled) {
			prevScreen = "altar";
			currentScreen = "tutorial";
			document.getElementById("tutText").innerHTML = "The rune combiner is a Runesmith's most powerful tool.<br>" + 
				"There are hundreds of combinations to discover, but some are universal.<br>" + 
				"Combining two of the same rune, for example, will always produce one of the next tier of rune.<br><br>" + 
				"Click the \"Combine\" button to access the combiner, or use the keyboard shortcut (C).<br>" + 
				"You can return to the Altar at any time by pressing its button or using the keyboard shortcut (A).";
			document.getElementById("tutorialScreen").style.display = "inline";
		}
	}
}

function present() {
	var id = "rune" + highestRune;
	var elem = document.getElementById(id);
	currentRunes += presentMult;
	totalRunes += presentMult;
	var val = parseInt(elem.getAttribute("value"));
	elem.setAttribute("value", val + presentMult);
	id = "numRune" + highestRune;
	document.getElementById(id).innerHTML = enumerate(elem.getAttribute("value"));
	document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
}

function selectRune(runeID) {
	var id = "rune" + runeID;
	var elem = document.getElementById(id);
	if (currentScreen == "combine") {
		if (selected < maxSelected) {
			var valid = false;
			if (selected == 0) valid = true;
			else if (selected >= 1) {
				var prevID = document.getElementById("combine" + (selected - 1)).getAttribute("value");
				if (prevID <= runeID) valid = true;
				else if (messages.length == 0) displayMessage("Runes must be inserted weakest to strongest!");
			}
			if (valid) {
				var val = parseInt(elem.getAttribute("value"));
				if (val >= combineX * Math.pow((runeID + 1), 2)) {
					val -= combineX * Math.pow((runeID + 1), 2);
					var comboID = "combine" + selected;
					var comboElem = document.getElementById(comboID);
					var pic = elem.getAttribute("src");
					comboElem.setAttribute("src", pic);
					comboElem.setAttribute("value", runeID);
					elem.setAttribute("value", val);
					document.getElementById("numRune" + runeID).innerHTML = enumerate(val);
					combineArray.push(runeID);
					selected++;
				} else {
					if (messages.length == 0) displayMessage("You need " + (combineX * Math.pow((runeID + 1), 2)) + " of this rune to use it in the rune combiner!");
				}
			}
		}
	} else if (currentScreen == "recipe" && runeID <= highestRune) {
		for (i = 0; i < 24; i++) {
			var borderID = "rune" + i;
			document.getElementById(borderID).style.borderStyle = "none";
		}
		elem.style.borderStyle = "solid";
		document.getElementById("log").innerHTML = "";
		
		for (i = 0; i <= runeID; i++) {
			var recipe2 = "" + i + "+" + runeID;
			document.getElementById("log").innerHTML += getRuneName(i) + "+" + getRuneName(runeID);
			if (failedRecipes.includes(recipe2)) document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRECIPE FAILED";
			else if (recipes.includes(recipe2)) document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRECIPE SUCCEEDED!";
			else if (hints.includes(recipe2))document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp!!!!!!!!";
			document.getElementById("log").innerHTML += "<br>";
			for (j = 0; j <= i; j++) {
				var recipe3 = "" + j + "+" + i + "+" + runeID;
				document.getElementById("log").innerHTML += getRuneName(j) + "+" + getRuneName(i) + "+" + getRuneName(runeID);
				if (failedRecipes.includes(recipe3)) document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRECIPE FAILED";
				else if (recipes.includes(recipe3)) document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRECIPE SUCCEEDED!";
				else if (hints.includes(recipe3))document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp!!!!!!!!";
				document.getElementById("log").innerHTML += "<br>";
				for (k = 0; k <= j; k++) {
					var recipe4 = "" + k + "+" + j + "+" + i + "+" + runeID;
					document.getElementById("log").innerHTML += getRuneName(k) + "+" + getRuneName(j) + "+" + getRuneName(i) + "+" + getRuneName(runeID);
					if (failedRecipes.includes(recipe4)) document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRECIPE FAILED";
					else if (recipes.includes(recipe4)) document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRECIPE SUCCEEDED!";
					else if (hints.includes(recipe4))document.getElementById("log").innerHTML += " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp!!!!!!!!";
					document.getElementById("log").innerHTML += "<br>";
				}
			}
		}
		document.getElementById("log").innerHTML += "<br>";
		document.getElementById("log").focus();
	}
}

function autoSelectRune(autoRuneID) {
	var autoId = "rune" + autoRuneID;
	var autoElem = document.getElementById(autoId);
	var autoVal = parseInt(autoElem.getAttribute("value"));
	if (autoVal >= (2 * Math.pow((autoRuneID + 1), 2))) {
		autoVal -= Math.pow((autoRuneID + 1), 2);
		if (autoSelected == 0) autoCombine0 = autoRuneID;
		else if (autoSelected == 1) autoCombine1 = autoRuneID;
		else displayMessage("ERROR with autoSelectRune!");
		autoElem.setAttribute("value", autoVal);
		document.getElementById("numRune" + autoRuneID).innerHTML = enumerate(autoVal);
		autoCombineArray.push(autoRuneID);
		autoSelected++;
	}
}

function removeRune(runeID) {
	if (selected == (runeID + 1)) {
		var comboID = "combine" + runeID;
		var comboElem = document.getElementById(comboID);
		comboElem.setAttribute("src", "images/blankRune.png");
		var runeNum = parseInt(comboElem.getAttribute("value"));
		var runeName = "rune" + runeNum;
		var val = parseInt(document.getElementById(runeName).getAttribute("value"));
		val += combineX * Math.pow((runeNum + 1), 2);
		document.getElementById(runeName).setAttribute("value", val);
		document.getElementById("numRune" + runeNum).innerHTML = enumerate(val);
		combineArray.pop();
		selected--;
	}
}

function autoRemoveRune(autoRuneID) {
	if (autoSelected == (autoRuneID + 1)) {
		if (autoSelected == 2) autoCombine1 = autoRuneID;
		else if (autoSelected == 1) autoCombine0 = autoRuneID;
		else console.log("Different ERROR!");
		var autoRuneNum = autoRuneID;
		var autoRuneName = "rune" + autoRuneNum;
		var autoVal = parseInt(document.getElementById(autoRuneName).getAttribute("value"));
		autoVal += Math.pow((autoRuneNum + 1), 2);
		document.getElementById(autoRuneName).setAttribute("value", autoVal);
		document.getElementById("numRune" + autoRuneNum).innerHTML = enumerate(autoVal);
		autoCombineArray.pop();
		autoSelected--;
	}
}

function removeAll() {
	while (selected > 0) {
		removeRune(selected - 1);
	}
}

function autoRemoveAll() {
	while (autoSelected > 0) {
		autoRemoveRune(autoSelected - 1);
	}
}

function autoMerge() {
	if (autoSelected == 2) {
		var autoRecipeID = "" + autoCombineArray[0] + "+" + autoCombineArray[1];
		var autoRuneID = autoCombineArray[0];
		var autoVal = parseInt(autoRuneID);
		autoSelected -= 2;
		autoCombineArray.pop();
		autoCombineArray.pop();
		currentRunes -= (2 * Math.pow((autoVal + 1), 2));
		document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
		combinations++;
		document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
		
		var autoOldRune = "rune" + autoVal;
		var autoOldElem = document.getElementById(autoOldRune);
		var autoNewRune = "rune" + (autoVal + 1);
		var autoNewElem = document.getElementById(autoNewRune);
		var autoOldNum = parseInt(autoOldElem.getAttribute("value"));
		var autoNewNum = parseInt(autoNewElem.getAttribute("value"));
		
		var autoRand = Math.floor(Math.random() * 100); //0 to 99
		var autoCrit = 1;
		if (autoRand < critChance) {
			autoCrit = critMult;
			displayMessage("Critical combine!", 2);
		}
		autoNewNum += (combineMultiplier * autoCrit);
		autoNewElem.setAttribute("value", autoNewNum);
		document.getElementById("numRune" + (autoVal + 1)).innerHTML = enumerate(autoNewNum);
		
		currentRunes += (combineMultiplier * autoCrit);
		totalRunes += (combineMultiplier * autoCrit);
		document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
	}
}

function combine() {
	
	if (selected == 2) {
		var recipeID = "" + combineArray[0] + "+" + combineArray[1];
		if (failedRecipes.includes(recipeID)) {
			displayMessage("Bad recipe!");
		} else if (!recipes.includes(recipeID) || combineArray[0] == combineArray[1]) {
			var runeID1 = combineArray[0];
			var runeID2 = combineArray[1];
			var val1 = parseInt(runeID1);
			var val2 = parseInt(runeID2);
			
			var r1 = "rune" + val1;
			var r2 = "rune" + val2;
			document.getElementById("combine0").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine1").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine0").removeAttribute("value");
			document.getElementById("combine1").removeAttribute("value");
			selected -= 2;
			combineArray.pop();
			combineArray.pop();
			combinations++;
			
			if (val1 == val2) {
				//Simple Merge!
				var newRune = "rune" + (val1 + 1);
				var newElem = document.getElementById(newRune);
				var newNum = parseInt(newElem.getAttribute("value"));
				
				if (newElem.getAttribute("value") == null || newElem.getAttribute("value") == "NaN") {
					//Making the first of a new rune tier
					newNum = 0;
					newElem.setAttribute("src", "images/rune" + (val1 + 1) + ".png");
					if (tooltipsOn) document.getElementById("text" + (val1 + 1)).classList.remove("hidden");
					highestRune++;
					if (totalRecipes == 0) {
						document.getElementById("recipe").style.display = "inline";
						document.getElementById("recipe").style.backgroundColor = "yellow";
						document.getElementById("recipe").style.borderColor = "yellow";
						document.getElementById("combine2").style.display = "inline";
						document.getElementById("combine3").style.display = "inline";
						maxSelected = 4;
						document.getElementById("save").style.display = "inline";
						document.getElementById("delete").style.display = "inline";
						if (tutorialEnabled) {
							prevScreen = "combine";
							currentScreen = "tutorial";
							document.getElementById("tutText").innerHTML = "From the recipes page, click a rune to see all the combinations " + 
								"you've tried up to that rune. <br>(The recipes page is still being worked on.)<br><br>" + 
								"The first 9 runes can be added to the rune combiner using the keyboard shortcuts (1-9), and then combined using (Spacebar). Remove all runes in the combiner by pressing (X).<br><br>" + 
								"For a quick boost, try combining 4 of the same rune! This is one of the 5 universal recipes.<br><br>" + 
								"Try all sorts of combinations to get more powerful runes and bonuses!";
							document.getElementById("tutorialScreen").style.display = "inline";
						}
					}
					totalRecipes++;
					document.getElementById("totalRecipes").innerHTML = totalRecipes;
					recipes.push(recipeID);
					displayMessage("New Rune Unlocked!");
				}
				var rand = Math.floor(Math.random() * 100); //0 to 99
				var crit = 1;
				if (rand < critChance) {
					crit = critMult;
					displayMessage("Critical combine!", 2);
				}
				newNum += (combineX * combineMultiplier * crit);
				newElem.setAttribute("value", newNum);
				document.getElementById("numRune" + (val1 + 1)).innerHTML = enumerate(newNum);
				currentRunes -= (2 * combineX * Math.pow((val1 + 1), 2));
				
				currentRunes += (combineX * combineMultiplier * crit);
				totalRunes += (combineX * combineMultiplier * crit);
				document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
				document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
				
				if (totalRunes >= 200 && document.getElementById("x1").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x1").style.display = "inline";
					document.getElementById("x2").style.display = "inline";
					if (tutorialEnabled) {
						prevScreen = "combine";
						currentScreen = "tutorial";
						document.getElementById("tutText").innerHTML = "Looks like things are coming along.<br>" + 
						"With these new buttons, you can combine more runes at once! Keep in mind you'll need lots of the higher " + 
						"order runes to do so. You can swap between these buttons using the left and right arrow keys as well.<br><br>" + 
						"And don't worry about wasting runes. Any new recipe unlocks will only cost one of each rune, regardless of how many " + 
						"you've inserted into the rune combiner.<br><br>" + 
						"Before you go, here's a free hint! <br>To unlock a very powerful tool, you'll need to use 1 of each of the first 4 runes together!";
						document.getElementById("tutorialScreen").style.display = "inline";
					}
				}
				if (totalRunes >= 1000 && document.getElementById("x5").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x5").style.display = "inline";
					if (tutorialEnabled) {
						prevScreen = "combine";
						currentScreen = "tutorial";
						var hint = increaseBaseRune[0].split("+");
						hints.push(increaseBaseRune[0]);
						document.getElementById("tutText").innerHTML = "Looking for a new hint?<br><br>You can unlock a powerful upgrade with the following recipe: <br>" + 
						getRuneName(parseInt(hint[0])) + "+" + getRuneName(parseInt(hint[1])) + "+" + getRuneName(parseInt(hint[2])) + "+" + getRuneName(parseInt(hint[3])) + "!";
						document.getElementById("tutorialScreen").style.display = "inline";
					}
				}
				if (totalRunes >= 10000 && document.getElementById("x10").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x10").style.display = "inline";
					if (tutorialEnabled) {
						prevScreen = "combine";
						currentScreen = "tutorial";
						var hint = increaseCombineBase[2].split("+");
						hints.push(increaseCombineBase[2]);
						document.getElementById("tutText").innerHTML = "Looking for a new hint?<br><br>You can unlock a powerful upgrade with the following recipe: <br>" + 
						getRuneName(parseInt(hint[0])) + "+" + getRuneName(parseInt(hint[1])) + "+" + getRuneName(parseInt(hint[2])) + "+" + getRuneName(parseInt(hint[3])) + "!";
						document.getElementById("tutorialScreen").style.display = "inline";
					}
				}
				if (totalRunes >= 100000 && document.getElementById("x100").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x100").style.display = "inline";
					if (tutorialEnabled) {
						prevScreen = "combine";
						currentScreen = "tutorial";
						var hint1 = increasePresentMult[1].split("+");
						var hint2 = increasePresentMult[2].split("+");
						hints.push(increasePresentMult[1]);
						hints.push(increasePresentMult[2]);
						document.getElementById("tutText").innerHTML = "Bring out your hints!<br><br>A two-for-one special! Have you tried either of these recipes? <br><br>" + 
						getRuneName(parseInt(hint1[0])) + "+" + getRuneName(parseInt(hint1[1])) + "+" + getRuneName(parseInt(hint1[2])) + "+" + getRuneName(parseInt(hint1[3])) + "!<br><br>" + 
						getRuneName(parseInt(hint2[0])) + "+" + getRuneName(parseInt(hint2[1])) + "+" + getRuneName(parseInt(hint2[2])) + "+" + getRuneName(parseInt(hint2[3])) + "!";
						document.getElementById("tutorialScreen").style.display = "inline";
					}
				}
				if (totalRunes >= 1000000 && document.getElementById("x1000").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x1000").style.display = "inline";
					if (tutorialEnabled) {
						prevScreen = "combine";
						var hint1 = increaseCritMult[2].split("+");
						var hint2 = increaseCritMult[3].split("+");
						var hint3 = increaseCritMult[4].split("+");
						hints.push(increaseCritMult[2]);
						hints.push(increaseCritMult[3]);
						hints.push(increaseCritMult[4]);
						currentScreen = "tutorial";
						document.getElementById("tutText").innerHTML = "Hintception!<br><br>" + 
						getRuneName(parseInt(hint1[0])) + "+" + getRuneName(parseInt(hint1[1])) + "+" + getRuneName(parseInt(hint1[2])) + "+" + getRuneName(parseInt(hint1[3])) + "!<br><br>" + 
						getRuneName(parseInt(hint2[0])) + "+" + getRuneName(parseInt(hint2[1])) + "+" + getRuneName(parseInt(hint2[2])) + "+" + getRuneName(parseInt(hint2[3])) + "!<br><br>" + 
						getRuneName(parseInt(hint3[0])) + "+" + getRuneName(parseInt(hint3[1])) + "+" + getRuneName(parseInt(hint3[2])) + "+" + getRuneName(parseInt(hint3[3])) + "!";
						document.getElementById("tutorialScreen").style.display = "inline";
					}
				}
				if (totalRunes >= 10000000 && document.getElementById("x10000").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x10000").style.display = "inline";
					if (tutorialEnabled) {
						prevScreen = "combine";
						currentScreen = "tutorial";
						document.getElementById("tutText").innerHTML = "Those last few hints should probably have been enough for the current version. " + 
						"If you're this far and haven't used them, do so! They'll increase the strength of many other recipes!<br><br>" + 
						"If you really used them and are still struggling, let me know on reddit/discord, so I can fix the game's balance.";
						document.getElementById("tutorialScreen").style.display = "inline";
					}
				}
				if (totalRunes >= 100000000 && document.getElementById("x100000").style.display != "inline" && currentScreen != "tutorial") {
					document.getElementById("x100000").style.display = "inline";
				}
				
			} else {
				recipes.push(recipeID);
				totalRecipes++;
				document.getElementById("totalRecipes").innerHTML = enumerate(totalRecipes);
				
				var newVal1 = parseInt(document.getElementById(r1).getAttribute("value"));
				var newVal2 = parseInt(document.getElementById(r2).getAttribute("value"));
				newVal1 += ((combineX - 1) * Math.pow((val1 + 1), 2));
				newVal2 += ((combineX - 1) * Math.pow((val2 + 1), 2));
				document.getElementById(r1).setAttribute("value", newVal1);
				document.getElementById(r2).setAttribute("value", newVal2);
				document.getElementById("numRune" + val1).innerHTML = enumerate(newVal1);
				document.getElementById("numRune" + val2).innerHTML = enumerate(newVal2);
				currentRunes -= Math.pow((val1 + 1), 2);
				currentRunes -= Math.pow((val2 + 1), 2);
				document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
			
				if (increaseRps.includes(recipeID)) {
					//Increase Base rps
					baseRps++;
					rps = baseRps * altarMultiplier;
					document.getElementById("rps").innerHTML = enumerate(rps);
					if (baseRps == 1) displayMessage("Your altar is now automatically producing runes!");
					else displayMessage("Runes per second +100%!");
				} else if (increaseAutoSpeed.includes(recipeID)) {
					//Increase the Auto-Combine speed
					autoSpeed++;
					document.getElementById("combineSpeed").innerHTML = autoSpeed;
					displayMessage("Auto-Combine speed increased!");
				} else if (increaseCritChance.includes(recipeID)) {
					//Increase the Crit Chance
					critChance++;
					if (critChance == 1) document.getElementById("header4").style.display = "inline";
					document.getElementById("critChance").innerHTML = critChance;
					displayMessage("Crit chance increased by 1%!");
				} else if (givePresents.includes(recipeID)) {
					//Give a present!
					var pres = parseInt(document.getElementById("rune" + highestRune).getAttribute("value"));
					pres += presentMult;
					document.getElementById("rune" + highestRune).setAttribute("value", pres);
					document.getElementById("numRune" + highestRune).innerHTML = enumerate(pres);
					displayMessage("You got a one-time gift of " + presentMult + " " + getRuneName(highestRune) + " runes!");
				} else {
					//Recipe failed
					combinations--;
					failedRecipes.push(recipeID);
					recipeFails++;
					displayMessage("Recipe Failed!");
				}
				document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
			}
		} else {
			displayMessage("Recipe already used!");
		} 
	} else if (selected == 3) {
		var recipeID = "" + combineArray[0] + "+" + combineArray[1] + "+" + combineArray[2];
		if (failedRecipes.includes(recipeID)) {
			displayMessage("Bad recipe!");
		} else if (!recipes.includes(recipeID)) {
			recipes.push(recipeID);
			totalRecipes++;
			document.getElementById("totalRecipes").innerHTML = enumerate(totalRecipes);
			var runeID1 = combineArray[0];
			var runeID2 = combineArray[1];
			var runeID3 = combineArray[2];
			var val1 = parseInt(runeID1);
			var val2 = parseInt(runeID2);
			var val3 = parseInt(runeID3);
			
			var r1 = "rune" + val1;
			var r2 = "rune" + val2;
			var r3 = "rune" + val3;
			var newVal1 = parseInt(document.getElementById(r1).getAttribute("value"));
			var newVal2 = parseInt(document.getElementById(r2).getAttribute("value"));
			var newVal3 = parseInt(document.getElementById(r3).getAttribute("value"));
			newVal1 += (combineX - 1) * Math.pow((val1 + 1), 2);
			newVal2 += (combineX - 1) * Math.pow((val2 + 1), 2);
			newVal3 += (combineX - 1) * Math.pow((val3 + 1), 2);
			document.getElementById(r1).setAttribute("value", newVal1);
			document.getElementById(r2).setAttribute("value", newVal2);
			document.getElementById(r3).setAttribute("value", newVal3);
			document.getElementById("numRune" + val1).innerHTML = enumerate(newVal1);
			document.getElementById("numRune" + val2).innerHTML = enumerate(newVal2);
			document.getElementById("numRune" + val3).innerHTML = enumerate(newVal3);
			
			document.getElementById("combine0").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine1").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine2").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine0").removeAttribute("value");
			document.getElementById("combine1").removeAttribute("value");
			document.getElementById("combine2").removeAttribute("value");
			selected -= 3;
			combineArray.pop();
			combineArray.pop();
			combineArray.pop();
			currentRunes -= Math.pow((val1 + 1), 2);
			currentRunes -= Math.pow((val2 + 1), 2);
			currentRunes -= Math.pow((val3 + 1), 2);
			document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
			combinations++;
			
			if (increaseAltarMult.includes(recipeID)) {
				//Increase Altar Multiplier
				altarMultiplier += 1;
				rps = baseRps * altarMultiplier;
				document.getElementById("altarMultiplier").innerHTML = enumerate(altarMultiplier);
				document.getElementById("rps").innerHTML = enumerate(rps);
				displayMessage("Altar Multiplier increased by 1!");
			} else if (increaseCombineMult.includes(recipeID)) {
				//Increase the Combine Multiplier
				combineMultiplier += 1;
				document.getElementById("combineMultiplier").innerHTML = enumerate(combineMultiplier);
				displayMessage("Combine Multiplier increased by 1!");
			} else if (increaseRps.includes(recipeID)) {
				//Increase Base rps
				baseRps++;
				rps = baseRps * altarMultiplier;
				document.getElementById("rps").innerHTML = enumerate(rps);
				if (baseRps == 1) displayMessage("Your altar is now automatically producing runes!");
				else displayMessage("Runes per second +100%!");
			} else if (increaseAutoSpeed.includes(recipeID)) {
				//Increase the Auto-Combine speed
				autoSpeed++;
				document.getElementById("combineSpeed").innerHTML = autoSpeed;
				displayMessage("Auto-Combine speed increased!");
			} else if (increaseCritChance.includes(recipeID)) {
				//Increase the Crit Chance
				critChance++;
				if (critChance == 1) document.getElementById("header4").style.display = "inline";
				document.getElementById("critChance").innerHTML = critChance;
				displayMessage("Crit chance increased by 1%!");
			} else if (givePresents.includes(recipeID)) {
				//Give a present!
				var pres = parseInt(document.getElementById("rune" + highestRune).getAttribute("value"));
				pres += presentMult;
				document.getElementById("rune" + highestRune).setAttribute("value", pres);
				document.getElementById("numRune" + highestRune).innerHTML = enumerate(pres);
				displayMessage("You got a one-time gift of " + presentMult + " " + getRuneName(highestRune) + " runes!");
			} else {
				//Recipe failed
				combinations--;
				failedRecipes.push(recipeID);
				recipeFails++;
				displayMessage("Recipe Failed!");
			}
			document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
		} else {
			displayMessage("Recipe already used!");
		}
	} else if (selected == 4) {
		var recipeID = "" + combineArray[0] + "+" + combineArray[1] + "+" + combineArray[2] + "+" + combineArray[3];
		if (failedRecipes.includes(recipeID)) {
			displayMessage("Bad recipe!");
		} else if (!recipes.includes(recipeID)) {
			recipes.push(recipeID);
			totalRecipes++;
			var runeID1 = combineArray[0];
			var runeID2 = combineArray[1];
			var runeID3 = combineArray[2];
			var runeID4 = combineArray[3];
			var val1 = parseInt(runeID1);
			var val2 = parseInt(runeID2);
			var val3 = parseInt(runeID3);
			var val4 = parseInt(runeID4);
			
			var r1 = "rune" + val1;
			var r2 = "rune" + val2;
			var r3 = "rune" + val3;
			var r4 = "rune" + val4;
			var newVal1 = parseInt(document.getElementById(r1).getAttribute("value"));
			var newVal2 = parseInt(document.getElementById(r2).getAttribute("value"));
			var newVal3 = parseInt(document.getElementById(r3).getAttribute("value"));
			var newVal4 = parseInt(document.getElementById(r4).getAttribute("value"));
			newVal1 += (combineX - 1) * Math.pow((val1 + 1), 2);
			newVal2 += (combineX - 1) * Math.pow((val2 + 1), 2);
			newVal3 += (combineX - 1) * Math.pow((val3 + 1), 2);
			newVal4 += (combineX - 1) * Math.pow((val4 + 1), 2);
			document.getElementById(r1).setAttribute("value", newVal1);
			document.getElementById(r2).setAttribute("value", newVal2);
			document.getElementById(r3).setAttribute("value", newVal3);
			document.getElementById(r4).setAttribute("value", newVal4);
			document.getElementById("numRune" + val1).innerHTML = enumerate(newVal1);
			document.getElementById("numRune" + val2).innerHTML = enumerate(newVal2);
			document.getElementById("numRune" + val3).innerHTML = enumerate(newVal3);
			document.getElementById("numRune" + val4).innerHTML = enumerate(newVal4);
			
			document.getElementById("totalRecipes").innerHTML = enumerate(totalRecipes);
			document.getElementById("combine0").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine1").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine2").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine3").setAttribute("src", "images/blankRune.png");
			document.getElementById("combine0").removeAttribute("value");
			document.getElementById("combine1").removeAttribute("value");
			document.getElementById("combine2").removeAttribute("value");
			document.getElementById("combine3").removeAttribute("value");
			selected -= 4;
			combineArray.pop();
			combineArray.pop();
			combineArray.pop();
			combineArray.pop();
			currentRunes -= Math.pow((val1 + 1), 2);
			currentRunes -= Math.pow((val2 + 1), 2);
			currentRunes -= Math.pow((val3 + 1), 2);
			currentRunes -= Math.pow((val4 + 1), 2);
			document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
			combinations++;
			
			if (increaseCombineMult.includes(recipeID)) {
				if (val1 == 17) gameWin(); //Congrats!
				//Increase Combine Multiplier
				combineMultiplier += 1;
				document.getElementById("combineMultiplier").innerHTML = enumerate(combineMultiplier);
				displayMessage("Combine Multiplier increased by 1!");
			} else if (increaseAltarMult.includes(recipeID)) {
				//Increase Altar Multiplier
				altarMultiplier += 1;
				rps = baseRps * altarMultiplier;
				document.getElementById("altarMultiplier").innerHTML = enumerate(altarMultiplier);
				document.getElementById("rps").innerHTML = enumerate(rps);
				displayMessage("Altar Multiplier increased by 1!");
			} else if (increaseRps.includes(recipeID)) {
				//Increase Base rps
				baseRps++;
				rps = baseRps * altarMultiplier;
				document.getElementById("rps").innerHTML = enumerate(rps);
				if (baseRps == 1) displayMessage("Your altar is now automatically producing runes!");
				else displayMessage("Runes per second +100%!");
			} else if (increaseAutoSpeed.includes(recipeID)) {
				//Increase the Auto-Combine speed
				autoSpeed++;
				document.getElementById("combineSpeed").innerHTML = autoSpeed;
				displayMessage("Auto-Combine speed increased!");
			} else if (increaseCombineBase.includes(recipeID)) {
				//Increase the Base Combine rune
				combineBase++;
				document.getElementById("combineBase").innerHTML = getRuneName(combineBase);
				displayMessage("Auto-Combine now combines up to " + getRuneName(combineBase) + "!");
			} else if (increaseBaseRune.includes(recipeID)) {
				//Increase Base Rune from Altar
				baseRune++;
				document.getElementById("baseRune").innerHTML = getRuneName(baseRune);
				displayMessage("The Altar will now create every rune up to " + getRuneName(baseRune) + "!");
			} else if (increaseCritChance.includes(recipeID)) {
				//Increase the Crit Chance
				critChance++;
				if (critChance == 1) document.getElementById("header4").style.display = "inline";
				document.getElementById("critChance").innerHTML = critChance;
				displayMessage("Crit chance increased by 1%!");
			} else if (increaseCritMult.includes(recipeID)) {
				//Increase the Crit Multiplier
				critMult++;
				document.getElementById("critMult").innerHTML = critMult;
				displayMessage("Crit Multiplier increased by 1!");
			} else if (increasePresentMult.includes(recipeID)) {
				//Increase the Present Multiplier
				presentMult *= 5;
				document.getElementById("presentMult").innerHTML = presentMult;
				document.getElementById("header4").style.display = "inline";
				displayMessage("Present Multiplier increased by 5x!");
			} else if (val1 == 0 && val2 == 1 && val3 == 2 && val4 == 3) {
				//Auto Combo!
				document.getElementById("autoCombine").style.display = "inline";
				document.getElementById("header3").style.display = "inline";
				document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
				displayMessage("Auto-Combine unlocked!");
			} else if (givePresents.includes(recipeID)) {
				//Give a present!
				var pres = parseInt(document.getElementById("rune" + highestRune).getAttribute("value"));
				pres += presentMult;
				document.getElementById("rune" + highestRune).setAttribute("value", pres);
				document.getElementById("numRune" + highestRune).innerHTML = enumerate(pres);
				displayMessage("You got a one-time gift of " + presentMult + " " + getRuneName(highestRune) + " runes!");
			} else {
				//Recipe failed
				combinations--;
				failedRecipes.push(recipeID);
				recipeFails++;
				displayMessage("Recipe Failed!");
			}
			document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
		} else {
			displayMessage("Recipe already used!");
		}
	}
}

function setCombine(amount) {
	removeAll();
	
	if (amount == 3) {
		switch(combineX) {
			case 1:
				amount = 1;
				break;
			case 2:
				amount = 1;
				break;
			case 5:
				amount = 2;
				break;
			case 10:
				amount = 5;
				break;
			case 100:
				amount = 10;
				break;
			case 1000:
				amount = 100;
				break;
			case 10000:
				amount = 1000;
				break;
			case 100000:
				amount = 10000;
				break;
			default: 
				amount = 1;
				console.log("Something went wrong with setCombine");
				break;
		}
	} else if (amount == 4) {
		switch(combineX) {
			case 1:
				if (document.getElementById("x2").style.display == "inline") amount = 2;
				else amount = 1;
				break;
			case 2:
				if (document.getElementById("x5").style.display == "inline") amount = 5;
				else amount = 2;
				break;
			case 5:
				if (document.getElementById("x10").style.display == "inline") amount = 10;
				else amount = 5;
				break;
			case 10:
				if (document.getElementById("x100").style.display == "inline") amount = 100;
				else amount = 10;
				break;
			case 100:
				if (document.getElementById("x1000").style.display == "inline") amount = 1000;
				else amount = 100;
				break;
			case 1000:
				if (document.getElementById("x10000").style.display == "inline") amount = 10000;
				else amount = 1000;
				break;
			case 10000:
				if (document.getElementById("x100000").style.display == "inline") amount = 100000;
				else amount = 10000;
				break;
			case 100000:
				amount = 100000;
				break;
			default: 
				amount = 1;
				console.log("Something went wrong with setCombine");
				break;
		}
	}
	
	var x = "x" + amount;
	combineX = amount;
	document.getElementById("x1").style.backgroundColor = "red";
	document.getElementById("x1").style.borderColor = "red";
	document.getElementById("x2").style.backgroundColor = "red";
	document.getElementById("x2").style.borderColor = "red";
	document.getElementById("x5").style.backgroundColor = "red";
	document.getElementById("x5").style.borderColor = "red";
	document.getElementById("x10").style.backgroundColor = "red";
	document.getElementById("x10").style.borderColor = "red";
	document.getElementById("x100").style.backgroundColor = "red";
	document.getElementById("x100").style.borderColor = "red";
	document.getElementById("x1000").style.backgroundColor = "red";
	document.getElementById("x1000").style.borderColor = "red";
	document.getElementById("x10000").style.backgroundColor = "red";
	document.getElementById("x10000").style.borderColor = "red";
	document.getElementById("x100000").style.backgroundColor = "red";
	document.getElementById("x100000").style.borderColor = "red";
	document.getElementById(x).style.backgroundColor = "green";
	document.getElementById(x).style.borderColor = "green";
}

function getRuneName(runeName) {
	switch (runeName) {
		case 0:
			runeName = "Aat";
			break;
		case 1:
			runeName = "Ain";
			break;
		case 2:
			runeName = "Ald";
			break;
		case 3:
			runeName = "Ang";
			break;
		case 4:
			runeName = "Ath";
			break;
		case 5:
			runeName = "Eds";
			break;
		case 6:
			runeName = "Een";
			break;
		case 7:
			runeName = "Eft";
			break;
		case 8:
			runeName = "Ery";
			break;
		case 9:
			runeName = "Ewl";
			break;
		case 10:
			runeName = "Ibb";
			break;
		case 11:
			runeName = "Ing";
			break;
		case 12:
			runeName = "Irq";
			break;
		case 13:
			runeName = "Isk";
			break;
		case 14:
			runeName = "Ivl";
			break;
		case 15:
			runeName = "Och";
			break;
		case 16:
			runeName = "Ont";
			break;
		case 17:
			runeName = "Opp";
			break;
		case 18:
			runeName = "Ort";
			break;
		case 19:
			runeName = "Ox";
			break;
		case 20:
			runeName = "Ugh";
			break;
		case 21:
			runeName = "Ujl";
			break;
		case 22:
			runeName = "Url";
			break;
		case 23:
			runeName = "Uzn";
			break;
		default: 
			runeName = "ERROR";
			break;
	}
	return runeName;
}

function toggleAuto() {
	autoCombining = !autoCombining;
	if (autoCombining) {
		document.getElementById("combining").innerHTML = "ON";
		document.getElementById("autoCombine").style.backgroundColor = "green";
		document.getElementById("autoCombine").style.borderColor = "green";
	} else {
		document.getElementById("combining").innerHTML = "OFF";
		document.getElementById("autoCombine").style.backgroundColor = "red";
		document.getElementById("autoCombine").style.borderColor = "red";
	}
}

function autoCombine(base) {
	autoRemoveAll();
	if (base == undefined) base = combineBase;
	if (base > 0) autoCombine(base - 1); //Yay recursion!
	for (i = 0; i < autoSpeed; i++) {
		autoSelectRune(base);
		autoSelectRune(base);
		autoMerge();
		autoRemoveAll();
	}
}

function goAltar() {
	if (currentScreen != "tutorial") {
		currentScreen = "altar";
		document.getElementById("combineAltar").style.display = "none";
		document.getElementById("recipeScreen").style.display = "none";
		document.getElementById("runeAltar").style.display = "inline";
		document.getElementById("versionScreen").style.display = "none";
		document.getElementById("altar").style.backgroundColor = "lightGrey";
		document.getElementById("altar").style.borderColor = "lightGrey";
		for (i = 0; i < 24; i++) {
			var borderID = "rune" + i;
			document.getElementById(borderID).style.borderStyle = "none";
		}
	}
}

function goCombine() {
	if (currentScreen != "tutorial") {
		currentScreen = "combine";
		document.getElementById("runeAltar").style.display = "none";
		document.getElementById("recipeScreen").style.display = "none";
		document.getElementById("versionScreen").style.display = "none";
		document.getElementById("combineAltar").style.display = "inline";
		document.getElementById("combine").style.backgroundColor = "lightGrey";
		document.getElementById("combine").style.borderColor = "lightGrey";
		for (i = 0; i < 24; i++) {
				var borderID = "rune" + i;
				document.getElementById(borderID).style.borderStyle = "none";
		}
	}
}

function goRecipe() {
	if (currentScreen != "tutorial") {
		currentScreen = "recipe";
		document.getElementById("log").innerHTML = "";
		document.getElementById("runeAltar").style.display = "none";
		document.getElementById("combineAltar").style.display = "none";
		document.getElementById("versionScreen").style.display = "none";
		document.getElementById("recipeScreen").style.display = "inline";
		document.getElementById("recipe").style.backgroundColor = "lightGrey";
		document.getElementById("recipe").style.borderColor = "lightGrey";
	}
}

function goVersion() {
	if (currentScreen != "tutorial") {
		currentScreen = "version";
		document.getElementById("versionScreen").style.display = "inline";
	}
}

function displayMessage(message, y) {
	if (y == 2){
		if (!fading2) {
			fading2 = true;
			document.getElementById("mess2").innerHTML = message;
			var fadeTarget2 = document.getElementById("message2");
			fadeTarget2.style.display = "inline";
			var fadeEffect2 = setInterval(function () {
				if (!fadeTarget2.style.opacity) {
					fadeTarget2.style.opacity = 1;
				}
				if (fadeTarget2.style.opacity > 0) {
					fadeTarget2.style.opacity -= 0.1;
				} else {
					fadeTarget2.style.opacity = null;
					document.getElementById("mess2").innerHTML = "";
					clearInterval(fadeEffect2);
					fading2 = false;
				}
			}, 200);
		}
	} else if (y == 3 && fading3) {
		messages2.push(message);
	} else if (y == 3 && !fading3) {
		if (!fading3) {
			fading3 = true;
			document.getElementById("mess3").innerHTML = message;
			var fadeTarget3 = document.getElementById("globalMessage");
			fadeTarget3.style.display = "inline";
			var fadeEffect3 = setInterval(function () {
				if (!fadeTarget3.style.opacity) {
					fadeTarget3.style.opacity = 1;
				}
				if (fadeTarget3.style.opacity > 0) {
					fadeTarget3.style.opacity -= 0.1;
				} else {
					fadeTarget3.style.opacity = null;
					document.getElementById("mess3").innerHTML = "";
					clearInterval(fadeEffect3);
					fading3 = false;
					if (messages2.length > 0) {
						message = messages2.shift();
						displayMessage(message, 3);
					}
				}
			}, 200);
		}
	} else if (fading) {
		messages.push(message);
	} else {
		fading = true;
		document.getElementById("mess").innerHTML = message;
		var fadeTarget = document.getElementById("message");
		fadeTarget.style.display = "inline";
		var fadeEffect = setInterval(function () {
			if (!fadeTarget.style.opacity) {
				fadeTarget.style.opacity = 1;
			}
			if (fadeTarget.style.opacity > 0) {
				fadeTarget.style.opacity -= 0.1;
			} else {
				fadeTarget.style.opacity = null;
				document.getElementById("mess").innerHTML = "";
				clearInterval(fadeEffect);
				fading = false;
				if (messages.length > 0) {
					message = messages.shift();
					displayMessage(message);
				}
			}
		}, 200);
	}
}

function closeTutorial() {
	currentScreen = prevScreen;
	document.getElementById("tutorialScreen").style.display = "none";
}

function saveGame() {
	date = Date.now();
	var save = {
		currentRunes : currentRunes,
		totalRunes : totalRunes,
		combinations : combinations,
		totalRecipes : totalRecipes,
		time : time,
		date : date,
		altarMultiplier : altarMultiplier,
		combineMultiplier : combineMultiplier,
		selected : selected,
		maxSelected : maxSelected,
		highestRune : highestRune,
		combineArray : combineArray,
		recipes : recipes,
		failedRecipes : failedRecipes,
		recipeFails : recipeFails,
		baseRps : baseRps,
		rps : rps,
		autoSpeed : autoSpeed,
		combineBase :  combineBase,
		baseRune : baseRune,
		critChance : critChance,
		critMult : critMult,
		presentMult : presentMult,
		tooltipsOn : tooltipsOn,
		tutorialEnabled : tutorialEnabled,
		allRecipes: allRecipes,
		increaseCombineMult : increaseCombineMult,
		increaseAltarMult : increaseAltarMult,
		increaseRps : increaseRps,
		increaseAutoSpeed : increaseAutoSpeed,
		increaseCombineBase : increaseCombineBase,
		increaseBaseRune : increaseBaseRune,
		increaseCritChance : increaseCritChance,
		increaseCritMult : increaseCritMult,
		increasePresentMult : increasePresentMult,
		givePresents : givePresents,
		hints : hints,
		runes0 : document.getElementById("rune0").getAttribute("value"), 
		runes1 : document.getElementById("rune1").getAttribute("value"), 
		runes2 : document.getElementById("rune2").getAttribute("value"), 
		runes3 : document.getElementById("rune3").getAttribute("value"), 
		runes4 : document.getElementById("rune4").getAttribute("value"), 
		runes5 : document.getElementById("rune5").getAttribute("value"), 
		runes6 : document.getElementById("rune6").getAttribute("value"), 
		runes7 : document.getElementById("rune7").getAttribute("value"), 
		runes8 : document.getElementById("rune8").getAttribute("value"), 
		runes9 : document.getElementById("rune9").getAttribute("value"), 
		runes10 : document.getElementById("rune10").getAttribute("value"), 
		runes11 : document.getElementById("rune11").getAttribute("value"), 
		runes12 : document.getElementById("rune12").getAttribute("value"), 
		runes13 : document.getElementById("rune13").getAttribute("value"), 
		runes14 : document.getElementById("rune14").getAttribute("value"), 
		runes15 : document.getElementById("rune15").getAttribute("value"), 
		runes16 : document.getElementById("rune16").getAttribute("value"), 
		runes17 : document.getElementById("rune17").getAttribute("value"), 
		runes18 : document.getElementById("rune18").getAttribute("value"), 
		runes19 : document.getElementById("rune19").getAttribute("value"), 
		runes20 : document.getElementById("rune20").getAttribute("value"), 
		runes21 : document.getElementById("rune21").getAttribute("value"), 
		runes22 : document.getElementById("rune22").getAttribute("value"), 
		runes23 : document.getElementById("rune23").getAttribute("value")
	}
	localStorage.setItem("ArkanusSave", JSON.stringify(save));
	displayMessage("Game Saved!", 3);
}

function loadGame() {
	var save = JSON.parse(localStorage.getItem("ArkanusSave"));
	if (save != null) {
		if (typeof save.currentRunes != "undefined") currentRunes = save.currentRunes;
		if (typeof save.totalRunes != "undefined") totalRunes = save.totalRunes;
		if (typeof save.combinations != "undefined") combinations = save.combinations;
		if (typeof save.totalRecipes != "undefined") totalRecipes = save.totalRecipes;
		if (typeof save.time != "undefined") time = save.time;
		if (typeof save.date != "undefined") date = save.date;
		if (typeof save.altarMultiplier != "undefined") altarMultiplier = save.altarMultiplier;
		if (typeof save.combineMultiplier != "undefined") combineMultiplier = save.combineMultiplier;
		if (typeof save.selected != "undefined") selected = save.selected;
		if (typeof save.maxSelected != "undefined") maxSelected = save.maxSelected;
		if (typeof save.highestRune != "undefined") highestRune = save.highestRune;
		if (typeof save.combineArray != "undefined") combineArray = save.combineArray;
		if (typeof save.recipes != "undefined") recipes = save.recipes;
		if (typeof save.failedRecipes != "undefined") failedRecipes = save.failedRecipes;
		if (typeof save.recipeFails != "undefined") recipeFails = save.recipeFails;
		if (typeof save.baseRps != "undefined") baseRps = save.baseRps;
		if (typeof save.rps != "undefined") rps = save.rps;
		if (typeof save.autoSpeed != "undefined") autoSpeed = save.autoSpeed;
		if (typeof save.combineBase != "undefined") combineBase = save.combineBase;
		if (typeof save.baseRune != "undefined") baseRune = save.baseRune;
		if (typeof save.critChance != "undefined") critChance = save.critChance;
		if (typeof save.critMult != "undefined") critMult = save.critMult;
		if (typeof save.presentMult != "undefined") presentMult = save.presentMult;
		if (typeof save.tooltipsOn != "undefined") tooltipsOn = save.tooltipsOn;
		if (typeof save.tutorialEnabled != "undefined") tutorialEnabled = save.tutorialEnabled;
		if (typeof save.allRecipes != "undefined") allRecipes = save.allRecipes;
		if (typeof save.increaseCombineMult != "undefined") increaseCombineMult = save.increaseCombineMult;
		if (typeof save.increaseAltarMult != "undefined") increaseAltarMult = save.increaseAltarMult;
		if (typeof save.increaseRps != "undefined") increaseRps = save.increaseRps;
		if (typeof save.increaseAutoSpeed != "undefined") increaseAutoSpeed = save.increaseAutoSpeed;
		if (typeof save.increaseCombineBase != "undefined") increaseCombineBase = save.increaseCombineBase;
		if (typeof save.increaseBaseRune != "undefined") increaseBaseRune = save.increaseBaseRune;
		if (typeof save.increaseCritChance != "undefined") increaseCritChance = save.increaseCritChance;
		if (typeof save.increaseCritMult != "undefined") increaseCritMult = save.increaseCritMult;
		if (typeof save.increasePresentMult != "undefined") increasePresentMult = save.increasePresentMult;
		if (typeof save.givePresents != "undefined") givePresents = save.givePresents;
		if (typeof save.hints != "undefined") hints = save.hints;
		if (typeof save.runes0 != "undefined") document.getElementById("rune0").setAttribute("value", parseInt(save.runes0));
		if (typeof save.runes1 != "undefined") document.getElementById("rune1").setAttribute("value", parseInt(save.runes1));
		if (typeof save.runes2 != "undefined") document.getElementById("rune2").setAttribute("value", parseInt(save.runes2));
		if (typeof save.runes3 != "undefined") document.getElementById("rune3").setAttribute("value", parseInt(save.runes3));
		if (typeof save.runes4 != "undefined") document.getElementById("rune4").setAttribute("value", parseInt(save.runes4));
		if (typeof save.runes5 != "undefined") document.getElementById("rune5").setAttribute("value", parseInt(save.runes5));
		if (typeof save.runes6 != "undefined") document.getElementById("rune6").setAttribute("value", parseInt(save.runes6));
		if (typeof save.runes7 != "undefined") document.getElementById("rune7").setAttribute("value", parseInt(save.runes7));
		if (typeof save.runes8 != "undefined") document.getElementById("rune8").setAttribute("value", parseInt(save.runes8));
		if (typeof save.runes9 != "undefined") document.getElementById("rune9").setAttribute("value", parseInt(save.runes9));
		if (typeof save.runes10 != "undefined") document.getElementById("rune10").setAttribute("value", parseInt(save.runes10));
		if (typeof save.runes11 != "undefined") document.getElementById("rune11").setAttribute("value", parseInt(save.runes11));
		if (typeof save.runes12 != "undefined") document.getElementById("rune12").setAttribute("value", parseInt(save.runes12));
		if (typeof save.runes13 != "undefined") document.getElementById("rune13").setAttribute("value", parseInt(save.runes13));
		if (typeof save.runes14 != "undefined") document.getElementById("rune14").setAttribute("value", parseInt(save.runes14));
		if (typeof save.runes15 != "undefined") document.getElementById("rune15").setAttribute("value", parseInt(save.runes15));
		if (typeof save.runes16 != "undefined") document.getElementById("rune16").setAttribute("value", parseInt(save.runes16));
		if (typeof save.runes17 != "undefined") document.getElementById("rune17").setAttribute("value", parseInt(save.runes17));
		if (typeof save.runes18 != "undefined") document.getElementById("rune18").setAttribute("value", parseInt(save.runes18));
		if (typeof save.runes19 != "undefined") document.getElementById("rune19").setAttribute("value", parseInt(save.runes19));
		if (typeof save.runes20 != "undefined") document.getElementById("rune20").setAttribute("value", parseInt(save.runes20));
		if (typeof save.runes21 != "undefined") document.getElementById("rune21").setAttribute("value", parseInt(save.runes21));
		if (typeof save.runes22 != "undefined") document.getElementById("rune22").setAttribute("value", parseInt(save.runes22));
		if (typeof save.runes23 != "undefined") document.getElementById("rune23").setAttribute("value", parseInt(save.runes23));
		
		document.getElementById("tutorialScreen").style.display = "none";
		currentScreen = "altar";
		for (i = 0; i < 24; i++) {
			var id = document.getElementById("rune" + i);
			if (id.getAttribute("value") != "NaN") {
				id.setAttribute("src", "images/rune" + i + ".png");
				document.getElementById("numRune" + i).innerHTML = enumerate(parseInt(id.getAttribute("value")));
				if (tooltipsOn) document.getElementById("text" + i	).classList.remove("hidden");
			}
		}
		document.getElementById("currentRunes").innerHTML = enumerate(currentRunes);
		document.getElementById("totalCombinations").innerHTML = enumerate(combinations);
		document.getElementById("totalRecipes").innerHTML = totalRecipes;
		document.getElementById("altarMultiplier").innerHTML = altarMultiplier;
		document.getElementById("combineMultiplier").innerHTML = combineMultiplier;
		document.getElementById("rps").innerHTML = rps;
		document.getElementById("baseRune").innerHTML = getRuneName(baseRune);
		document.getElementById("combineSpeed").innerHTML = autoSpeed;
		document.getElementById("combineBase").innerHTML = getRuneName(combineBase);
		document.getElementById("critChance").innerHTML = critChance;
		document.getElementById("critMult").innerHTML = critMult;
		document.getElementById("presentMult").innerHTML = presentMult;
		if (totalRunes >= 10) document.getElementById("combine").style.display = "inline";
		if (totalRunes >= 200) {
			document.getElementById("x1").style.display = "inline";
			document.getElementById("x2").style.display = "inline";
		}
		if (totalRunes >= 1000) document.getElementById("x5").style.display = "inline";
		if (totalRunes >= 10000) document.getElementById("x10").style.display = "inline";
		if (totalRunes >= 100000) document.getElementById("x100").style.display = "inline";
		if (totalRunes >= 1000000) document.getElementById("x1000").style.display = "inline";
		if (totalRunes >= 10000000) document.getElementById("x10000").style.display = "inline";
		if (totalRunes >= 100000000) document.getElementById("x100000").style.display = "inline";
		if (totalRecipes >= 1) {
			document.getElementById("combine2").style.display = "inline";
			document.getElementById("combine3").style.display = "inline";
			document.getElementById("recipe").style.display = "inline";
			document.getElementById("save").style.display = "inline";
			document.getElementById("delete").style.display = "inline";
		}
		if (recipes.includes("0+1+2+3")) {
			document.getElementById("autoCombine").style.display = "inline";
			document.getElementById("header3").style.display = "inline";
		}
		if (critChance >= 1 || presentMult > 5) document.getElementById("header4").style.display = "inline";
		goAltar();
		displayMessage("Game loaded", 3);
		var ti = Math.floor((Date.now() - date) / 1000);
		makeRune(ti * rps);
		displayMessage("You were offline for " + formatTime(ti), 3);
		displayMessage("Your altar produced " + enumerate(ti * rps) + " of each rune up to " + getRuneName(baseRune) + "!", 3);
	}
}

//Deletes the HTML5 local storage. 
function deleteSave() {
	localStorage.removeItem("ArkanusSave");
	displayMessage("Save deleted.", 3);
}

function gameWin() {
	prevScreen = "combine";
	currentScreen = "tutorial";
	var gameTime = formatTime(time);
	document.getElementById("tutText").innerHTML = "Game completed in " + gameTime + "!<br><br>" + 
	"You created a total of " + enumerate(totalRunes) + " runes!<br><br>" + 
	"You discovered " + (recipes.length - failedRecipes.length) + " recipes out of a total " + allRecipes.length + "!<br><br>" + 
	"The full version of the game will include all 24 runes and many more recipes and features!<br><br>" + 
	"Please contact Nohmou on reddit or discord for information or to leave feedback.";
	document.getElementById("xButton").style.display = "none";
	document.getElementById("tutorialScreen").style.display = "inline";
	//displayMessage("You Win!");
	//displayMessage("It took you " + gameTime + " to complete the game!");
	rps = 0;
	autoCombining = false;
}

function formatTime(t) {
	if (t < 0) return "Invalid time";
	var tempTime = t;
	var seconds = tempTime % 60;
	tempTime -= seconds;
	tempTime /= 60;
	var minutes = tempTime % 60;
	tempTime -= minutes;
	tempTime /= 60;
	var hours = tempTime % 24;
	tempTime -= hours;
	tempTime /= 24;
	var days = tempTime;
	if (seconds < 10) seconds = "0" + seconds;
	if (minutes < 10) minutes = "0" + minutes;
	if (hours < 10) hours = "0" + hours;
	if (days < 10) days = "0" + days;
	return "" + days + ":" + hours + ":" + minutes + ":" + seconds;
}

//Make numbers look good.
function enumerate(x) {
	if (isNaN(x)) return x;
	if (x <= 9999) return x;
	if (x <= 100000) return (x/1000).toFixed(2) + "K";
	if (x <= 1000000) return (x/1000).toFixed(1) + "K";
	if (x <= 10000000) return (x/1000000).toFixed(3) + "M";
	if (x <= 100000000) return (x/1000000).toFixed(2) + "M";
	if (x <= 1000000000) return (x/1000000).toFixed(1) + "M";
	if (x <= 10000000000) return (x/1000000000).toFixed(3) + "B";
	if (x <= 100000000000) return (x/1000000000).toFixed(2) + "B";
	if (x <= 1000000000000) return (x/1000000000).toFixed(1) + "B";
	if (x <= 10000000000000) return (x/1000000000000).toFixed(3) + "T";
	if (x <= 100000000000000) return (x/1000000000000).toFixed(2) + "T";
	if (x <= 1000000000000000) return (x/1000000000000).toFixed(1) + "T";
	if (x <= 10000000000000000) return (x/1000000000000000).toFixed(3) + "Qa";
	if (x <= 100000000000000000) return (x/1000000000000000).toFixed(2) + "Qa";
	if (x <= 1000000000000000000) return (x/1000000000000000).toFixed(1) + "Qa";
	if (x <= 10000000000000000000) return (x/1000000000000000000).toFixed(3) + "Qi";
	if (x <= 100000000000000000000) return (x/1000000000000000000).toFixed(2) + "Qi";
	if (x <= 1000000000000000000000) return (x/1000000000000000000).toFixed(1) + "Qi";
	if (x <= 10000000000000000000000) return (x/1000000000000000000000).toFixed(3) + "Sx";
	if (x <= 100000000000000000000000) return (x/1000000000000000000000).toFixed(2) + "Sx";
	if (x <= 1000000000000000000000000) return (x/1000000000000000000000).toFixed(1) + "Sx";
	if (x <= 10000000000000000000000000) return (x/1000000000000000000000000).toFixed(3) + "Sp";
	if (x <= 100000000000000000000000000) return (x/1000000000000000000000000).toFixed(2) + "Sp";
	if (x <= 1000000000000000000000000000) return (x/1000000000000000000000000).toFixed(1) + "Sp";
	if (x <= 10000000000000000000000000000) return (x/1000000000000000000000000000).toFixed(3) + "Oc";
	if (x <= 100000000000000000000000000000) return (x/1000000000000000000000000000).toFixed(2) + "Oc";
	if (x <= 1000000000000000000000000000000) return (x/1000000000000000000000000000).toFixed(1) + "Oc";
	if (x <= 10000000000000000000000000000000) return (x/1000000000000000000000000000000).toFixed(3) + "No";
	if (x <= 100000000000000000000000000000000) return (x/1000000000000000000000000000000).toFixed(2) + "No";
	if (x <= 1000000000000000000000000000000000) return (x/1000000000000000000000000000000).toFixed(1) + "No";
	if (x <= 10000000000000000000000000000000000) return (x/1000000000000000000000000000000000).toFixed(3) + "Dc";
	if (x <= 100000000000000000000000000000000000) return (x/1000000000000000000000000000000000).toFixed(2) + "Dc";
	if (x <= 1000000000000000000000000000000000000) return (x/1000000000000000000000000000000000).toFixed(1) + "Dc";
	//add a while loop to deal with the rest
	x = (x/1000000000000000000000000000000000000).toFixed(3);
	var n = 36;
	while (x > 999.999) {
		x = (x/1000);
		n += 3;
	}
	if (x < 1000) x = (x/1).toFixed(1);
	if (x < 100) x = (x/1).toFixed(2);
	if (x < 10) x = (x/1).toFixed(3);
	return x + "e" + n;
}

window.setInterval(function() {
	time++;
	if (rps > 0) makeRune(rps);
	if (autoCombining) autoCombine();
	if (time % 60 == 0 && totalRecipes >= 1) saveGame();
}, 1000);

document.onkeypress = function(e) {
		if (e.which == 97) goAltar();
		else if (e.which == 99 && document.getElementById("combine").style.display == "inline") goCombine();
		else if (e.which == 114 && document.getElementById("recipe").style.display == "inline") goRecipe();
		else if (e.which == 120 && document.getElementById("recipe").style.display == "inline") removeAll();
		else if (e.which == 118) goVersion();
		else if (e.which == 49 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(0);
		else if (e.which == 50 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(1);
		else if (e.which == 51 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(2);
		else if (e.which == 52 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(3);
		else if (e.which == 53 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(4);
		else if (e.which == 54 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(5);
		else if (e.which == 55 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(6);
		else if (e.which == 56 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(7);
		else if (e.which == 57 && (currentScreen == "combine" || currentScreen == "recipe")) selectRune(8);
		//else console.log(e.which);
	}

window.onkeydown = function(ev) {
	if (ev.keyCode === 32 && currentScreen == "combine") {
		ev.preventDefault();
		combine();
	} else if (ev.keyCode == 37 && currentScreen == "combine") {
		ev.preventDefault();
		setCombine(3);
	} else if (ev.keyCode == 39 && currentScreen == "combine") { 
		ev.preventDefault();
		setCombine(4);
	} //else console.log(ev.which);
}

function updateScale() {
	var ww = $win.width();
	var wh = $win.height();
	var newScale = 1;
	//Compare ratios.
	if (ww/wh < baseSize.w / baseSize.h) {
		newScale = ww / baseSize.w;
	} else {
		newScale = wh / baseSize.h;
	}
	$lay.css('transform', 'scale(' + newScale + ',' + newScale + ')');
}

$(window).resize(updateScale);

//Copyright Nohmou, 2018