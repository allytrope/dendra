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
$(".node").click(function() {
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
});
