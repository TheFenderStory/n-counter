/*
 * View
 */
var controller = new Controller();

// Update the characters view
function updateCharacterUi() {
	var output = "";

	for (var i = 0; i < controller.encounter.order.length; i++) {
		var cur = controller.getCharacter(controller.encounter.order[i].name);

		if (cur.alive === true) {
			if (i === 0) {
				output += '<div class="row"><div class="col-md-2 alive-field">Currently Moving -- </div>';
			} else {
				output += '<div class="row"><div class="col-md-2 alive-field"></div>';
			}

			output +='<div class="col-md-2 init-field" data-target="' + cur.name + '">' + cur.initiative +
			'</div> <div contenteditable="true" class="col-md-2 name-field"data-target="' + cur.name + '">' + cur.name +
			'</div> <div contenteditable="true" class="col-md-2 hp-field" data-target="' + cur.name + '">' + cur.hp +
			'</div> <div contenteditable="true" class="col-md-2 notes-field" data-target="' + cur.name + '">' + cur.notes +
			'</div> <button data-target="' + cur.name +
			'" type="button" class="btn btn-danger delete-char">Remove - </button> </div></div><hr class="dotted"/>';
		}
	}
	$("#characters").html(output);
}

// Next turn
$("#next-turn").click(function() {
	controller.nextTurn();
	updateCharacterUi();
});

// Add new character
$("#add-char").click(function() {
	var init = $("#initiative-field");
	var name = $("#name-field");
	var hp = $("#hp-field");
	var notes = $("#notes-field");

	controller.addCharacter(init.val(), name.val(), hp.val(), notes.val());

	init.val("");
	name.val("");
	hp.val("");
	notes.val("");
	updateCharacterUi();
});

// Delete a character
$('#characters').on('click', '.delete-char', function() {
	var target = $(this).data("target");
	controller.updateCharacter(target, "alive", false);
	updateCharacterUi();
});

// Update list for name field changes
$('#characters').on('focusout', '.name-field', function(e) {
	var target = $(this).data("target");
	controller.updateCharacter(target, "name", $(this).text());
});

// Update list for hp field changes
$('#characters').on('focusout', '.hp-field', function(e) {
	var target = $(this).data("target");
	controller.updateCharacter(target, "hp", parseInt($(this).text()));
});

// Update list for notes field changes
$('#characters').on('focusout', '.notes-field', function(e) {
	var target = $(this).data("target");
	controller.updateCharacter(target, "notes", $(this).text());
});