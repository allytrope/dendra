/* Determine length of x-axis by number of leaf nodes on pedigree. */
x_length = $("#descendants li:not(:has(li))").length
x_length *= 4.95
$("#descendants").css('width', x_length.toString() + 'em')

// Keep track of whether CTRL key is pressed
var ctrlPressed = false;
$(document).keydown(function(evt) {
  if (evt.which == 17) {
    ctrlPressed = true;
  }
}).keyup(function(evt) {
  if (evt.which == 17) {
    ctrlPressed = false;
  }
});

// Toggle for hiding nodes' descendants
$(".node").click(function () {
    if (!ctrlPressed && $(this).parent().children().length > 1){  // Only hides if has descendants
        $(this).parent().children().toggle();
        $(this).show();
        $(this).toggleClass("collapsed");
        return false; //Invalidates link
    }
    else if (!ctrlPressed) {
        return false; //Invalidates link
    }
});

