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


function checkNames(){
    for (var i =0; i < result.length; i++){
        var indivName = result.businesses[i].name;
        if(indivName === userInput){
            userObj =result.businesses[i];
        }
    }
    displayMap();
}

function displayMap() {
    lat= userObj.coordinates.latitude;
    long=userObj.coordinates.longitude;
    var mapProp= {
        center:new google.maps.LatLng(lat,long),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function displayModal(){
    var name= userObj.name;
    var url= userObj.url;
    
    displayPictures();
    //display the name, url, & the pictures onto the modal
}

function displayPictures(){
    //create divs and append onto the modal
}

function getDataPictures(){

}
