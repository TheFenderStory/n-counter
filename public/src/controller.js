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
	var char = new Character(parseInt(init), name, parseInt(hp), notes);
	this.encounter.enqueue(char);
	this.encounter.characters[name] = char;
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