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


// Changing individual panel on hover of node
$(".node").hover(function(){
    if ($("#indiv_lock").text() == "🔒") {
        return;
    }
    var proband = $(this).children().first().children().first().text();
    //alert(proband);
    $.get("/api/individuals/" + proband + "/", function(data, status){
        $("#indiv_id").text(data.id);
        $("#indiv_sex").text(data.sex);
        //alert("Data: " + data.sex + "\nStatus: " + status);
    })
},
function(){}
)


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
        // Collapse nodes
        if ($(this).hasClass("collapsed")){
            $(this).parent().children("ul").show('slow', function(){ $(this).parent().children("ul").show(); });
        }
        // Uncollapse nodes
        else {
            $(this).parent().children("ul").hide('slow', function(){ $(this).parent().children("ul").hide(); });
        }
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


// Testng for inverting mates
//$(".node").children("p").children("span").filter(function)
//$(".indiv30029").html("test")
// $(".node").filter(function(idx) {
//     return this.children("p").children("span").first().innerHTML[0] == "3";
//  }).css("background-color", "green");
// $(".node:contains('30015')").parent().addClass("mate")  //.css("background-color", "green");

$("#indiv_lock").click(function(){
   $(this).toggleClass("locked");
    if ($(this).text() == "🔒"){
        $(this).text("🔓");
    }
    else{
        $(this).text("🔒");
    }
})



// Calling local REST API for single proband
$(".male_selector").click(function(){
    var proband = $(".proband").first().text();
    $.get("/api/individuals/" + proband + "/", function(data, status){
        alert("Data: " + data.sex + "\nStatus: " + status);
    })
    // $.ajax({
    //     url: "/api/individuals/",
    //     type: 'GET',
    //     dataType: "json",
    //     data: {
    //         "id": "27886",
    //     },
    //     success: (response) => {
    //         alert(response.id);
    //     },
    //     error: (error) => {
    //         console.log(error);
    //     }
    // })
})

// // Calling local REST API for all individuals in tree
// $(".female_selector").click(function(){
//     $(".node").each(func(index){
//         $.get("/api/individuals/" + proband + "/", function(data, status){})
// })


$(".mates_selector").click(function(){
    $(".mate").toggleClass("hidden");
})