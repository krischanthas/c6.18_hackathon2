$(document).ready(initializeApp);

var userInput;
var userObj = {};

function initializeApp(){
    applyClickHandlers();
}

function applyClickHandlers(){
    $('.submitButton').on('click',getUserInput);
    $('.clearButton').on('click', clearInput);

}


function getUserInput(){
    userInput = $('.inputForm').val();
    console.log(userInput); 
}
function clearInput(){
    $('.inputForm').val('');
}

function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }