/*
 * View
 */
var controller = new Controller();

// Handle toggling to home page
$("#home-button").click(function() {
	$("#home-view").removeClass("hidden");
	$("#encounters-view").addClass("hidden");
});

// Shows the saved encounters
function drawSavedEncounters() {
	var encounters = controller.getEncounters();
	var output = "";

	for (var i = 0; i < encounters.length; i++) {
		var encounter = encounters[i];
		var date = "Not set";

		if (encounter.data.hasOwnProperty("date")) {
			date = encounter.data.date;
		}

		output +='<div class="row" style="text-align:center"><div class="col-md-2">' +
		'</div> <div class="col-md-2" style="text-align:center">' + encounters[i].name +
		'</div> <div class="col-md-2">' + date +
		'</div> <div class="col-md-2" style="text-align:center">' + encounter.data.order.length +
		'</div> <button data-target="' + encounters[i].name +
		'" type="button" class="btn btn-primary import-encounter">Import Encounter </button>&nbsp&nbsp&nbsp<button data-target="' + encounters[i].name +
		'" type="button" class="btn btn-danger delete-encounter">Remove - </button> </div></div><hr class="dotted"/></div>';
	}
	$("#saved-encounters").html(output);
}

// Handle toggling to encounters page
$("#encounters-button").click(function() {
	$("#home-view").addClass("hidden");
	$("#encounters-view").removeClass("hidden");
	drawSavedEncounters();
});

// Update the characters view
function updateCharacterUi() {
	var output = "";

	for (var i = 0; i < controller.encounter.order.length; i++) {
		var cur = controller.getCharacter(controller.encounter.order[i]);

		if (cur.alive === true) {
			if (i === 0) {
				output += '<div class="row"><div class="col-md-2 alive-field">Currently Moving -- </div>';
			} else {
				output += '<div class="row"><div class="col-md-2 alive-field"></div>';
			}

			output +='<div contenteditable="true" class="col-md-2 init-field" data-target="' + cur.name + '">' + cur.initiative +
			'</div> <div contenteditable="true" class="col-md-2 name-field"data-target="' + cur.name + '">' + cur.name +
			'</div> <div contenteditable="true" class="col-md-2 hp-field" data-target="' + cur.name + '">' + cur.hp +
			'</div> <div contenteditable="true" class="col-md-2 notes-field" data-target="' + cur.name + '">' + cur.notes +
			'</div> <button data-target="' + cur.name +
			'" type="button" class="btn btn-danger delete-char">Remove - </button> </div></div><hr class="dotted"/>';
		}
	}
	$("#characters").html(output);

	console.log(controller.encounter.name);
	if (controller.encounter.name != null) {
		$("#encounter-name-space").text(controller.encounter.name);
		$("#encounter-name-space").data("encounter", controller.encounter.name);
	}
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

	var status = controller.addCharacter(init.val(), name.val(), hp.val(), notes.val());

	if (!status.code) {
		alert("Failed to add character: " + name.val() + ". " + status.message + ".");
	} else {
		init.val("");
		name.val("");
		hp.val("");
		notes.val("");
		updateCharacterUi();
	}
});

// Delete a character
$('#characters').on('click', '.delete-char', function() {
	var target = $(this).data("target");
	controller.updateCharacter(target, "alive", false);
	updateCharacterUi();
});

// Import an encounter
$('#saved-encounters').on('click', '.import-encounter', function() {
	var target = $(this).data("target");
	controller.loadEncounter(target);
	$("#home-view").removeClass("hidden");
	$("#encounters-view").addClass("hidden");
	updateCharacterUi();
});

// Remove an encounter
$('#saved-encounters').on('click', '.delete-encounter', function() {
	var target = $(this).data("target");
	controller.removeEncounter(target);
	drawSavedEncounters();
});

// Update list for name field changes
$('#characters').on('focusout', '.init-field', function(e) {
	var target = $(this).data("target");
	controller.updateCharacter(target, "initiative", parseInt($(this).text()));
	controller.recalculateInit();
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

// Save encounters
$("#save-encounter-btn").click(function() {
	var name = $("#encounter-name-field").val();
	$("#encounter-name-field").val("");
	controller.saveEncounter(name);
});

// Prepopulate name field for prexisting getEncounters
$("#save-encounter").click(function() {
	if ($("#encounter-name-space").data("encounter") != null) {
		$("#encounter-name-field").val($("#encounter-name-space").data("encounter"));
	}
});

// New Encounter
$("#create-new-encounter").click(function() {
	$("#home-view").removeClass("hidden");
	$("#encounters-view").addClass("hidden");
	$("#encounter-name-space").text("New Encounter");
	$("#encounter-name-space").data("encounter", "");
	controller = new Controller();
	updateCharacterUi();
});