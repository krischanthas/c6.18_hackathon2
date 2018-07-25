$(document).ready(initializeApp);
var userInput;
var userObj = {};


function initializeApp() {

    applyClickHandlers();
    getDataPhotos();
    inputEnter();
}

function applyClickHandlers() {
    console.log('in applyClickHandlers')
    $('.submitButton').on('click', getUserInput);
    //$('.submitButton, .clearButton').on('click', );
    $('.clearButton').on('click', clearInput);

}
// function removeContent(){
//     $('.iframe').addClass('hidden');
//     $('.mainDisplay').empty();
//     getDataPhotos();

// }

function getUserInput() {
    userInput = $('.inputForm').val();
    console.log(userInput);
    getWeatherData(userInput);
    getData(userInput);
    displayModal();
}

function clearInput() {
    $('.inputForm').val('');
}

function inputEnter() {
    $('input').keydown(function (e) {
        if (e.keyCode == 13) {
            $('.submitButton').click();
        }
    });
}

function displayMap() {

    var lati = 33.634867;
    var long = -117.740499;


    var mapProp = {
        center: new google.maps.LatLng(lati, long),
        zoom: 13,
    };
    if (userObj.coordinates) {
        lati = userObj.coordinates.latitude;
        long = userObj.coordinates.longitude;
        mapProp = {
            center: new google.maps.LatLng(lati, long),
            zoom: 13,
        };
    }
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
            lat: lati,
            lng: long
        },
    });
    google.maps.event.addListener(marker, 'click', getVideoData);
    marker.addListener('click', toggleBounce);
    $(".container").append(map);
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
        console.log(indivName);
        if (indivName === userInput) {
            userObj = response.businesses[i];
            break;
        }
    }
    displayMap();
}

function displayModal() {
    var name = userObj.name;
    var url = userObj.url;
    $('.popup-container').css("display", "block");
    $('.modal-title').text(name);
    getDataPhotos();
}

//yelp data
function getData(userInput) {
    debugger;
    var settings = {
        "url": "https://yelp.ongandy.com/businesses",
        "method": "POST",
        "dataType": "JSON",
        "data": {
            term: userInput,
            location: "Orange County",
            api_key: "w5ThXNvXEMnLlZYTNrvrh7Mf0ZGQNFhcP6K-LPzktl8NBZcE1_DC7X4f6ZXWb62mV8HsZkDX2Zc4p86LtU0Is9kI0Y0Ug0GvwC7FvumSylmNLfLpeikscQZw41pXW3Yx",
            categories: "beaches",
        },
        success: function (response) {

            checkNames(response);
        },
        error: function (err) {

            console.log('getData error: ', err);
        }
    }
    $.ajax(settings);
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
        success: function (response) {
            displayVideo(response);
            console.log('success response', response);
            var videoData = response["video"][0].id;
            console.log('www.youtube.com/watch?v=' + videoData);
            $('.modal-body .video-body').append('<iframe>', {
                attr: {
                    src: 'https://www.youtube.com/watch?v=' + videoData,
                    class: 'videoPopUp'

                }
            })

        },
        error: function (response) {
            console.log('request error');
        }
    }
    $.ajax(ajaxConfig);
}

function displayVideo(response) {
    console.log('displayVideo success response', response);
    var videoData = response["video"][0].id;
    console.log('www.youtube.com/watch?v=' + videoData);
    $('.iframe').removeClass('hidden')
    $('.iframe').attr("src", 'https://www.youtube.com/embed/' + videoData + '?autoplay=1').addClass("videoPopUp")
}


function getWeatherData(userInput) {
    $('.mainDisplay').empty();
    var ajaxConfig = {
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&APPID=f91cd80c3f28fab67ca696381fb71d30',
        dataType: 'json',
        method: 'get',
        success: function (response) {
            var weather = response.main.temp;
            var cityName = response.name;
            var condition = response.weather[0].main;
            
            var symbol;
            debugger;
            switch(condition){
                case 'Haze': symbol= 'fas fa-cloud';
                break;
                case 'Clouds': symbol= 'fas fa-cloud';
                break;
                case 'Clear': symbol= 'fas fa-sun';
                break;
                case 'Rain': symbol= 'fas fa-umbrella';
                break;
            }
            var conditionSymbol = $('<i>').addClass(symbol);
            $('.modal-title').text(cityName);
            $('.mainDisplay').append(conditionSymbol ,`  ${condition}`);
            $('.temp').text(`Current temperature: ${weather}°F `)
        },
        error: function () {
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
        text: userInput,
        privacy_filter: 1,
        per_page: 3,
        tags: "beach, sunset",
    }

    var ajaxOption = {
        data: theData,
        dataType: 'json',
        url: "https://api.flickr.com/services/rest",
        method: 'GET',
        success: function (response) {
            debugger;
            console.log(response);
            var photoArray = response.photos.photo;
            console.log(photoArray);
            clearCarousel();
            for (var pIndex = 0; pIndex < photoArray.length; pIndex++) {
                var currentPhoto = photoArray[pIndex];
                var serverID = currentPhoto.server;
                var photoID = currentPhoto.id;
                var secretID = currentPhoto.secret;
                var url = "https://farm1.staticflickr.com/" + serverID + "/" + photoID + "_" + secretID + ".jpg";
                var carouselImage = $(".carousel-image" + (pIndex + 1));
                carouselImage.prepend('<img src="' + url + '" />');
                carouselImage.children().addClass("d-block w-100");
            }

        }
    }
    $.ajax(ajaxOption);
}

function clearCarousel() {
    $('.carousel-item').empty();
}
