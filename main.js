$(document).ready(initializeApp);

var userInput;
var userObj = {};

function initializeApp() {
    applyClickHandlers();
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


function checkNames() {
    for (var i = 0; i < result.length; i++) {
        var indivName = result.businesses[i].name;
        if (indivName === userInput) {
            userObj = result.businesses[i];
        }
    }
    displayMap();
}

function displayMap() {
    lat = userObj.coordinates.latitude;
    long = userObj.coordinates.longitude;
    var mapProp = {
        center: new google.maps.LatLng(lat, long),
        zoom: 5,
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function displayModal() {
    var name = userObj.name;
    var url = userObj.url;
    getDataPhotos();
    displayPictures();
    //display the name, url, & the pictures onto the modal
}

function displayPictures() {
    //create divs and append onto the modal
}

function getDataPictures() {

}

function getDataPhotos() {
    debugger;
    var theData = {
        api_key: "b5e905e415b7b888752b23f5629b2410",
        method: "flickr.photos.search",
        format: "json",
        nojsoncallback: 1,
        text: "Huntington Beach",
        privacy_filter: 1,
        per_page: 3,
    }

    var ajaxOption = {
        data: theData,
        dataType: 'json',
        url: "https://api.flickr.com/services/rest",
        method: 'GET',
        success: function (response) {
            console.log(response);
            var photoArray = response.photos.photo;
            console.log(photoArray);
            for (var pIndex = 0; pIndex < photoArray.length; pIndex++) {
                debugger;
                var currentPhoto = photoArray[pIndex];
                var serverID = currentPhoto.server;
                var photoID = currentPhoto.id;
                var secretID = currentPhoto.secret;
                var url = "https://farm1.staticflickr.com/" + serverID + "/" + photoID + "_" + secretID + ".jpg";
                console.log(url);
                $(".carousel-image" + (i + 1)).prepend('<img src="' + url + '" />').addClass('d-block', 'w-100');
            }
        }
    }
    $.ajax(ajaxOption);
}

function getData() {
    var settings = {
        "url": "https://yelp.ongandy.com/businesses",
        "method": "POST",
        "dataType": "JSON",
        "data": {
            term: "beach",
            location: "irvine",
            api_key: "w5ThXNvXEMnLlZYTNrvrh7Mf0ZGQNFhcP6K-LPzktl8NBZcE1_DC7X4f6ZXWb62mV8HsZkDX2Zc4p86LtU0Is9kI0Y0Ug0GvwC7FvumSylmNLfLpeikscQZw41pXW3Yx",
        },
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    }

    $.ajax(settings);

}