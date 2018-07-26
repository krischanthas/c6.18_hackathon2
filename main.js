/************************************
 * Listen for the doucment to load and initialize the application
 */
$(document).ready(initializeApp);
/************************************
 * Define all global variables here
 */
var userInput;
var userObj = {};

/************************************
 * InitializeApp 
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls: applyClickHandlers, getDataPhotos, inputEnter
 * Initializes the application including adding the handlers and pulling in any data from the server
 */
function initializeApp() {
    applyClickHandlers();
    getDataPhotos();
    inputEnter();
}
/************************************
 * applyClickHandlers
 * @params {undefined} none
 * @returns: {undefined} none
 * Applies clicks on element to call certain functions whenclicked
 */
function applyClickHandlers() {
    console.log('in applyClickHandlers')
    $('.submitButton').on('click', getUserInput);
    //$('.submitButton, .clearButton').on('click', );
    $('.clearButton').on('click', clearInput);
    $('.liveStreamButton').on('click', getVideoData);
    $('.videoClose').on('click', function(){
        $('.videoModal').addClass('hidden');
    })
    $('.modal-backdrop').on('click', function(){
        $('.videoModal').addClass('hidden');
        // $('.iframe').get(0).stopVideo();
    })
    $('#closeModal').click(clearModal);
}
/************************************
 * getUserInput
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls: getData displayModal
 * Stores the user input and uses it to getData and run the modal while capitalizing the first letters of the input 
 */
function getUserInput() {
    userInput = $('.inputForm').val();
    userInput = capitalizeFirstLetters();
    getData();
    displayModal();
}
/************************************
 * clearInput
 * @params {undefined} none
 * @returns: {undefined} none
 * Clears the input value if user makes a mistake
 */
function clearInput() {
    $('.inputForm').val('');
}
/************************************
 * inputEnters
 * @params {undefined} none
 * @returns: {undefined} none
 * allows to hit enter to submit values
 */
function inputEnter() {
    $('input').keydown(function (e) {
        if (e.keyCode == 13) {
            $('.submitButton').click();
        }
    });
}
/************************************
 * displayMap
 * @params {undefined} none
 * @returns: {undefined} none.
 * Displays the map on load and the marker of location
 */
function displayMap() {
    var lati = 33.634867;
    var long = -117.740499;
    var mapProp = {
        center: new google.maps.LatLng(lati, long),
        zoom: 13,
        mapTypeControl: false,
    };
    if (userObj.coordinates) {
        lati = userObj.coordinates.latitude;
        long = userObj.coordinates.longitude;
        mapProp = {
            center: new google.maps.LatLng(lati, long),
            zoom: 13,
            mapTypeControl: false,
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
/************************************
 * toggleBounce
 * @params {undefined} none
 * @returns: {undefined} none
 * adds animation to the google map marker
 */
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
/************************************
 * checkNames
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls displayMap
 * Stores the result from Yelp data based on what the user inputs into userObj and runs the coordinate into display maps 
 */
function checkNames(response) {
            userObj = response.businesses[0];
    displayMap();
}
/************************************
 * displayModal
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls getDataPhotos
 * Shows the modal and displays the name for the input the user placed. Also holds the carousel photo gallery
 */
function displayModal() {
    var name = userObj.name;
    $('.popup-container').css("display", "block");
    $('.modal-title').text(name); 
    $('.close').click(clearModal);
    getDataPhotos();
   
}
/************************************
 * getData
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls checkNames, getWeatherData
 * getData calls the yelp api to get coordinates to display on the map based off the user input 
 */
function getData() {
    var settings = {
        "url": "https://yelp.ongandy.com/businesses",
        "method": "POST",
        "dataType": "JSON",
        "data": {
            term: userInput + " beach",
            location: "Orange County",
            api_key: "w5ThXNvXEMnLlZYTNrvrh7Mf0ZGQNFhcP6K-LPzktl8NBZcE1_DC7X4f6ZXWb62mV8HsZkDX2Zc4p86LtU0Is9kI0Y0Ug0GvwC7FvumSylmNLfLpeikscQZw41pXW3Yx",
            categories: "beaches",
        },
        success: function (response) {
            checkNames(response);
            getWeatherData(userInput);
        },
        error: function (err) {
        }
    }
    $.ajax(settings);
}
/************************************
 * getVideoData
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls displayVideo
 * When this function gets called it pulls up link for a single video based on user input
 */ 
function getVideoData() {
    var theData = {
        'q': userInput + ' beach live stream' ,
        'maxResults': 1,
    }
    var ajaxConfig = {
        data: theData,
        dataType: 'json',
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function (response) {
            displayVideo(response);
        },
        error: function (response) {
        }
    }
    $.ajax(ajaxConfig);
}
/************************************
 * displayVideo
 * @params {undefined} none
 * @returns: {undefined} none
 * Brings up a modal and displays the video link in the modal
 */
function displayVideo(response) {
    var videoData = response["video"][0].id;
    if((response.video[0].title).indexOf(userInput) === -1){
        alert('Video not available');
    }else{
        $('.iframe').removeClass('hidden');
        $('.videoModal').removeClass('hidden');
        $('.iframe').attr("src", 'https://www.youtube.com/embed/' + videoData + '?autoplay=1').addClass("videoPopUp")
    
    }

 }
/************************************
 * getWeatherData
 * @params {undefined} none
 * @returns: {undefined} none
 * Gets weather data from API and appends type of weather based on data received as well as showing temperature
 */
function getWeatherData() {
    $('.mainDisplay').empty();
    var cityName = userObj.location.city;
    var ajaxConfig = {
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&APPID=f91cd80c3f28fab67ca696381fb71d30',
        dataType: 'json',
        method: 'get',
        success: function (response) {
            var weather = response.main.temp;
            var condition = response.weather[0].main;
            var symbol;
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
            $('.modal-title').text(userInput);
            $('.mainDisplay').append(conditionSymbol ,`  ${condition}`);
            $('.temp').text(`Current temperature: ${weather}°F `)
        },
        error: function () {
            if(userInput.includes('Beach')){
                userInput = userInput.replace('Beach', '');
                getWeatherData(userInput);
            }
        }
    }
    $.ajax(ajaxConfig);
}
/************************************
 * getDataPhotos
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls clearCarousel
 * Gets the photos from Flickr API and appends them to a gallery on the modal
 */
function getDataPhotos() {
    var theData = {
        api_key: "b5e905e415b7b888752b23f5629b2410",
        method: "flickr.photos.search",
        format: "json",
        nojsoncallback: 1,
        text: userInput +' beach view',
        privacy_filter: 1,
        per_page: 5,
        tags: "beaches, sunset, shoreline, waves, shore,",
    }
    var ajaxOption = {
        data: theData,
        dataType: 'json',
        url: "https://api.flickr.com/services/rest",
        method: 'GET',
        success: function (response) {
            var photoArray = response.photos.photo;
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
/************************************
 * clearCarousel
 * @params {undefined} none
 * @returns: {undefined} none
 * Empties the carousel 
 */
function clearCarousel() {
    $('.carousel-item').empty();
}
/************************************
 * clearModal
 * @params {undefined} none
 * @returns: {undefined} none
 * Closes the modal
 */
function clearModal(){
    $('.popup-container').css("display", "none");
}
/************************************
 * capitalizeFirstLetters
 * @params {undefined} none
 * @returns: {undefined} none
 * capitalizes the first letter of every word for input
 */
function capitalizeFirstLetters(){
    var inputVal = $('.inputForm').val();
    var tempArr = inputVal.split(' ');
    for(var i = 0; i < tempArr.length; i++){
        tempArr[i] = tempArr[i].substr(0,1).toUpperCase()+tempArr[i].substr(1);
    }
    return tempArr.join(' ');

}
