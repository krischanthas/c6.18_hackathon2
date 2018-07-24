$(document).ready(initializeApp);

var userInput;
var userObj = {};

function initializeApp() {
    applyClickHandlers();
    // dropPin();
}

function applyClickHandlers() {
    $('.submitButton').on('click', getUserInput);
    $('.clearButton').on('click', clearInput);

}


function getUserInput() {
    userInput = $('.inputForm').val();
    console.log(userInput);
}

function clearInput() {
    $('.inputForm').val('');
}

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(33.6189, -117.9298),
        zoom: 13,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
            lat: 33.6189,
            lng: -117.9298
        },
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}