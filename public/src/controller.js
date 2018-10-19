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
 * Getter for the encounter
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
Controller.prototype.removeCharacter = function(target) {
	if (this.encounter.characters.hasOwnProperty(target)) {
		this.encounter.removeCharacter(target);
	}
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
	if (!(name.indexOf("encounter-") > -1)) {
		name = "encounter-" + name;
	}

	this.encounter.name = name;
	window.localStorage.setItem(name, JSON.stringify(this.encounter));
}

/*
 * Loads an encounter to local storage.
*/
Controller.prototype.loadEncounter = function(name) {
	var data = JSON.parse(window.localStorage.getItem(name));

	this.encounter = new Encounter();
	this.encounter.order = data.order;
	this.encounter.characters = data.characters;
	this.encounter.date = data.date;

	if (data.hasOwnProperty("name")) {
		this.encounter.name = data.name;
	}
}

/*
 * Loads a list of all encounters in local storage.
*/
Controller.prototype.getEncounter = function(name) {
	return JSON.parse(window.localStorage.getItem(name));
}

/*
 * Loads a list of all encounters in local storage.
*/
Controller.prototype.getEncounters = function(name) {
	var encounters = [];
	for (var i = 0, len = window.localStorage.length; i < len; i++) {
		var key = window.localStorage.key(i);

		if (key.indexOf("encounter") > -1) {
			encounters.push({name: key, data: this.getEncounter(key)});
		}
	}
	return encounters;
}

/*
 * Removes an encounter from local storage
*/
Controller.prototype.removeEncounter = function(name) {
	window.localStorage.removeItem(name);
}

/*
 * Reorders the initiative queue after an update
*/
Controller.prototype.recalculateInit = function() {
	this.encounter.recalculateInit();
}