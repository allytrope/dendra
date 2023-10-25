// Keep track of whether CTRL and SHIFT keys are pressed
var ctrlPressed = false;
var shiftPressed = false;
$(document).keydown(function(evt) {
  if (evt.which == 17) {
    ctrlPressed = true;
  }
  else if (evt.which == 16) {
    shiftPressed = true;
  }
}).keyup(function(evt) {
  if (evt.which == 17) {
    ctrlPressed = false;
  }
  else if (evt.which == 16) {
    shiftPressed = false;
  }
});

// Toggle for hiding nodes' descendants
$(".node").click(function() {
    if (shiftPressed) {
        $(this).parent().children("ul").appendTo("#ancestors"); // Move out ancestors
        $(this).parent().appendTo($("#descendants").children("ul").first()); // Move node down
        //$("#descendants").children("ul").first().children("li").first().appendTo($("#descendants").children("ul").first().children("li").last().children("ul").first())
        //$("#descendants").children().first().children().first().empty();
        return false; //Invalidates link
    }
    else if (!ctrlPressed && $(this).parent().children().length > 1){  // Only hides if has descendants
        $(this).parent().children().toggle();
        $(this).show();
        $(this).toggleClass("collapsed");
        return false; //Invalidates link
    }
    else if (!ctrlPressed) {
        return false; //Invalidates link
    }
});

// Toggle for hiding generations past nth
$(".generations p").click(function() {
    var gen_idx = $(this).index();
    function offspring(individuals) {
        return individuals.children("li").children("ul");
    }
    nth_gen = $(".root li ul");
    for (let i=0; i<gen_idx; i++) {
        nth_gen = offspring(nth_gen);
    }
    nth_gen.toggle();
    nth_gen.parent().children("a").toggleClass("collapsed");
});

// Toggle for condensing nodes
$(".condense").click(function() {
    $(".node").toggleClass("condensed");

    // Toggle text between "Condense" and "Expand"
    $(this).text($(this).text() == "Condense" ? "Expand" : "Condense");
});
