$(document).ready(initializeApp);
var userInput;
var userObj = {};


function initializeApp() {
    applyClickHandlers();
    getDataPhotos();
}

function applyClickHandlers() {
    console.log('in applyClickHandlers')
    $('.submitButton').on('click', getUserInput);
    $('.clearButton').on('click', clearInput);
    $('.submitButton').on('click', )

}

function getUserInput() {
    var userInput = $('.inputForm').val();
    console.log(userInput);
    // getWeatherData(userInput);
    getVideoData();
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

function checkNames(response) {
    for (var i = 0; i < response.businesses.length; i++) {
        var indivName = response.businesses[i].name;
    }
}

function displayMap() {
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

function checkNames(response) {
    for (var i = 0; i < response.length; i++) {
        var indivName = response.businesses[i].name;
        if (indivName === userInput) {
            userObj = response.businesses[i];
            return;
        }
    }
    // displayMap();
}




function displayMap() {
    // lat = userObj.coordinates.latitude;
    lat = userObj.coordinates[0];
    //long = userObj.coordinates.longitude;
    long = userObj.coordinates[1];
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
        category    : "beaches"
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
//yelp data
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
        success: function (response) {
            // debugger;
            console.log('getData success: ', response);
            checkNames(response);
        },
        error: function (err) {
            // debugger;
            console.log('getData error: ', err);
        }
    }
    
    $.ajax(settings);
    


    

    displayPictures();
    //display the name, url, & the pictures onto the modal
}

function displayPictures() {
    //create divs and append onto the modal
}

function getVideoData() {
    var theData = {
        'q': userInput + ' live stream',
        'maxResults': 1,
    }
    var ajaxConfig = {
        data: theData,
        dataType: 'json',
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function(response){
            console.log('success response', response);
            // var videoData = response["video"]["title"][0];
            // console.log('video data' , videoData);
        },
        error: function(response){
            console.log('request error');
        }
    }
    $.ajax(ajaxConfig);
}

function getWeatherData(userInput){
    var ajaxConfig = {
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&APPID=f91cd80c3f28fab67ca696381fb71d30',
        dataType: 'json',
        method: 'get',
        success: function(response) {
            var weather = response.main.temp;
            console.log(weather);
            var cityName = response.name;
        //    $('.mainDisplay').text(`Current weather in ${cityName}: ${weather}`);
        
        },
        error: function (){
            console.log('requestError');
        }
    }
    $.ajax(ajaxConfig);
}


function getDataPhotos() {
    var theData = {
        api_key: "b5e905e415b7b888752b23f5629b2410",
        method: "flickr.photos.search",
        format: "json",
        nojsoncallback: 1,
        text: "newport beach",
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
            debugger;
            for (var pIndex = 0; pIndex < photoArray.length; pIndex++) {
                debugger;
                var currentPhoto = photoArray[pIndex];
                var serverID = currentPhoto.server;
                var photoID = currentPhoto.id;
                var secretID = currentPhoto.secret;
                var url = "https://farm1.staticflickr.com/" + serverID + "/" + photoID + "_" + secretID + ".jpg";
                console.log(url);
                var  carouselImage =  $(".carousel-image" + (pIndex + 1));
                carouselImage.prepend('<img src="' + url + '" />');
                carouselImage.children().addClass("d-block w-100");
            }
               
        }
    }
    $.ajax(ajaxOption);
}


