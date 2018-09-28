/*
 * Controller
 */

 /*
  * Object model for the controller
 */
function Controller() {
	this.encounter = new Encounter()
};

/*
 * Adds a new character to the model
*/
Controller.prototype.encounter = function(init, name, hp, notes) {
	return this.encounter;
}

/*
 * Next characters turn
*/
Controller.prototype.nextTurn = function() {
	this.encounter.next();
}

/*
 * Adds a new character to the model
*/
Controller.prototype.addCharacter = function(init, name, hp, notes) {
	init = parseInt(init);
	hp = parseInt(hp);

	if (!name) {
		return {code: false, message: "Missing character name"};
	}

	if (this.encounter.characters.hasOwnProperty(name)) {
		return {code: false, message: "Character already exists"};
	}

	if (isNaN(init)) {
		return {code: false, message: "Missing initiative value"};
	}

	if (isNaN(hp)) {
		hp = 0;
	}

	var char = new Character(init, name, hp, notes);
	this.encounter.enqueue(char);
	this.encounter.characters[name] = char;

	return {code: true, message: ""};
}

/*
 * Returns a character from the table.
*/
Controller.prototype.getCharacter = function(target) {
	return this.encounter.characters[target];
}

/*
 * Updates a characters info in the table
*/
Controller.prototype.updateCharacter = function(target, stat, value) {
	return this.encounter.characters[target][stat] = value;
}

/*
 * Saves an encounter to local storage.
*/
Controller.prototype.saveEncounter = function(name) {
	window.localStorage.setItem(name, , JSON.stringify(this.encounter));
}

/*
 * Loads an encounter to local storage.
*/
Controller.prototype.loadEncounter = function(name) {
	this.encounter = JSON.parse(window.localStorage.getItem(name));
}

/*
 * Removes an encounter from local storage
*/
Controller.prototype.removeEncounter = function(name) {
	window.localStorage.removeItem(name);
}