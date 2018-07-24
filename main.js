$(document).ready(initializeApp);

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
    var userInput = $('.inputForm').val();
    console.log(userInput);
    getData(userInput);
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
}
    function getData(userInput) {
    var settings = {
        "url": "https://yelp.ongandy.com/businesses",
        "method": "POST",
        "dataType": "JSON",
        "data": {
            term: userInput,
            location: "orange county", 
            api_key: "w5ThXNvXEMnLlZYTNrvrh7Mf0ZGQNFhcP6K-LPzktl8NBZcE1_DC7X4f6ZXWb62mV8HsZkDX2Zc4p86LtU0Is9kI0Y0Ug0GvwC7FvumSylmNLfLpeikscQZw41pXW3Yx",
            categories: "beaches",
        },
        success: function(response) {
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    }
    
    $.ajax(settings);
    


    

    displayPictures();
    //display the name, url, & the pictures onto the modal
}

function displayPictures() {
    //create divs and append onto the modal
}

function getDataPictures() {

}


function getDataPhotos() {
    var theData = {
        api_key: "b5e905e415b7b888752b23f5629b2410",
        method: "flickr.photos.search",
        format: "json",
        nojsoncallback: 1,
        text: "",
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


