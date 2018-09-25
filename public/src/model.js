/*
 * Model
 */

/*
 * Object model for the current encounter
*/
function Encounter() {
	this.order = [];
	this.characters = {};
}

/*
 * Adds a character into the queue based on their initiative
 * @param character
*/
Encounter.prototype.enqueue = function(character) {
	for (var i = 0; i < this.order.length; i++) {
		if (this.order[i].initiative < character.initiative) {
			this.order.splice(i, 0, character);
			contain = true;
			return;
		}
	}

	this.order.push(character);
}

/*
 * Moves the current front character to the back of the queue
*/
Encounter.prototype.next = function() {
	var char = this.order.shift();
	if (char.alive) {
		this.order.push(char);
	}
}

/*
 * Returns the character at the front of the queue
*/
Encounter.prototype.front = function() {
	if (this.isEmpty()) {
		return null;
	}
	return this.order[0];
}

/*
 * Returns true if the queue is empty
*/
Encounter.prototype.isEmpty = function() {
	return this.order.length === 0;
}

/*
 * Object model for a Character
 *
 * @param Initiative: int
 * @param name: string
 * @param hp: int
 * @param notes: string
*/
function Character(initiative, name, hp, notes) {
	this.initiative = initiative;
	this.name = name;
	this.hp = hp;
	this.notes = notes;
	this.alive = true;
}