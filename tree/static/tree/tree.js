document.getElementById("t").innerHTML = "First";

const mates_div = document.getElementById('mates');
var mates = mates_div.children;
for(var i=0; i<mates.length; i++){
    document.getElementById("t").innerHTML = "Second";
    var mate = mates[i];
    mate.children[0].children[i].addEventListener('mouseover', () => mate.children[0].children[i].style.backgroundColor = "orange");
    mate.children[0].children[i].addEventListener('mouseleave', () => mate.children[0].children[i].style.backgroundColor = "white");
    document.getElementById("t").innerHTML = "Third";
}
