/************************************
 * Listen for the doucment to load and initialize the application
 */
$(document).ready(initializeApp);
var previousRoute = false;
/************************************
 * Define all global variables here
 */
var userInput;
var userObj = {};

/************************************
 * InitializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls: applyClickHandlers, getPhotos, inputEnter
 * Initializes the application including adding the handlers and pulling in any data from the server
 */
function initializeApp() {
  applyClickHandlers();
  getPhotos();
  displayMap(true);
}
/************************************
 * applyClickHandlers
 * @params {undefined} none
 * @returns: {undefined} none
 * Applies clicks on element to call certain functions whenclicked
 */
function applyClickHandlers() {
  $(".submitButton").on("click", getUserInput);
  //$('.submitButton, .clearButton').on('click', );
  $(".clearButton").on("click", clearInput);
  $(".liveStreamButton").on("click", getVideoData);
  $(".videoClose").on("click", function () {
    $(".videoModal").addClass("hidden");
  });
  $(".modal-backdrop").on("click", function () {
    $(".videoModal").addClass("hidden");
    // $('.iframe').get(0).stopVideo();
  });
  $("#closeModal").click(clearModal);
  $('a[href="#infoTab"]').on("click", function () {
    createCarousel();
  })
  $('a[href="#foodTab"]').on("click", function () {
    destroyCarousel();
  })
  $('a[href="#directionsTab"]').on("click", function () {
    destroyCarousel();
  })
}
/************************************
 * getUserInput
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls: getData displayModal
 * Stores the user input and uses it to getData and run the modal while capitalizing the first letters of the input
 */
function getUserInput() {
  userInput = $(".inputForm").val();
  userInput = capitalizeFirstLetters();
  displayMap();
}
/************************************
 * clearInput
 * @params {undefined} none
 * @returns: {undefined} none
 * Clears the input value if user makes a mistake
 */
function clearInput() {
  $(".inputForm").val("");
}
/************************************
 * inputEnters
 * @params {undefined} none
 * @returns: {undefined} none
 * allows to hit enter to submit values
 */
function inputEnter() {
  $("input").keydown(function (e) {
    if (e.keyCode == 13) {
      $(".submitButton").click();
    }
  });
}
/************************************
 * displayMap
 * @params {undefined} none
 * @returns: {undefined} none.
 * Displays the map on load and the marker of location
 */

function displayMap(initial = false) {
  getPhotos();
  if (initial === true) {
    var pos = {
      lat: 33.634867,
      lng: -117.740499
    }
  }
  if (navigator.geolocation && initial === true) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      currentPos = pos;
      map.setCenter(pos);
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: pos,
      });
    })
  }

  var mapProp = {
    zoom: 13,
    mapTypeControl: false,
  };


  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  if (userInput) {
    checkUserInput(map);
  } else {

  }


  map.setCenter(pos);

  // var pos = {
  // lat : userObj.coordinates.latitude,
  // lng : userObj.coordinates.longitude }
  // mapProp = {
  //     center: new google.maps.LatLng(pos),
  //     zoom: 13,
  //     mapTypeControl: false,
  // };


  // marker = new google.maps.Marker({
  //     map: map,
  //     draggable: true,
  //     animation: google.maps.Animation.DROP,
  //     position: pos
  //   });
  // marker.addListener("click", toggleBounce);
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
  //     userObj = response.results;
  //    var  latitude = userObj.location.lat
  //   var longitude =  userObj.location.long
  userObj = response.businesses[0];
  displayMap();
}
/************************************
 * displayModal
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls getPhotos
 * Shows the modal and displays the name for the input the user placed. Also holds the carousel photo gallery
 */
function displayModal() {
  // var name = userObj.name;
  // getWeatherData(userInput);
  $(".popup-container").css("display", "block");
  $("#infoTab").addClass("show");
  // $('.modal-title').text(name);
  $(".close").click(clearModal);
}
/********************
 * getBeaches
 *  get Beaches usings google places library to obtain beach
 */

/************************************
 * getYelpData
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls checkNames, getWeatherData
 * getData calls the yelp api to get coordinates to display on the map based off the user input
 */
function getYelpData(position) {
  var lat = position.lat;
  var long = position.lng;
  var settings = {
    async: true,
    url: "https://yelp.ongandy.com/businesses",
    method: "POST",
    dataType: "JSON",
    data: {
      term: "food",
      latitude: lat,
      longitude: long,
      api_key: "w5ThXNvXEMnLlZYTNrvrh7Mf0ZGQNFhcP6K-LPzktl8NBZcE1_DC7X4f6ZXWb62mV8HsZkDX2Zc4p86LtU0Is9kI0Y0Ug0GvwC7FvumSylmNLfLpeikscQZw41pXW3Yx",
      categories: "restaurants, All",
      sort_by: "rating",
      radius: 5000
    },
    success: function (response) {
      console.log(response);
      for (var index = 0; index < response.businesses.length; index++) {
        var pos = {
          lat: response.businesses[index].coordinates.latitude,
          lng: response.businesses[index].coordinates.longitude
        };

        // restaurant name
        var content = response.businesses[index].name; // returns string
        // //restaurant address
        // var address = response.businesses[index].display_address[0]+response.businesses[index].display_address[1]; 
        // // restaurant type
        var category = response.businesses[index].categories[0].title; // returns string
        // // phone number
        var phone = response.businesses[index].display_phone; // return string
        // // price 
        // var price = response.businesses[index].price; // returns string
        // // rating
        // var rating = response.businesses[index].rating; // returns int
        // // restaurant image url
        // var imageUrl = response.businesses[index].image_url; // url string
        // // open-status
        // var openstatus = response.businesses[index].is_closed; // returns boolean


        // pop up window
        var infowindow = new google.maps.InfoWindow({
          content: content
        });
        // food icons for map
        var icon = {
          url: "./food.svg", // url
          scaledSize: new google.maps.Size(30, 30) // scaled size
        };
        var marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: pos,
          title: response.businesses[index].name,
          icon: icon
        });
        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, content, infowindow) {
            return function () {
              infowindow.setContent(content);
              infowindow.open(map, marker);
            };
          })(marker, content, infowindow)
        );
      }
    },
    error: function (err) {
      console.log("error");
    }
  };
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
    q: userInput + " beach live stream",
    maxResults: 1
  };
  var ajaxConfig = {
    data: theData,
    dataType: "json",
    method: "POST",
    url: "https://s-apis.learningfuze.com/hackathon/youtube/search.php",
    success: function (response) {
      displayVideo(response);
    },
    error: function (response) {}
  };
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
  if (response.video[0].title.indexOf(userInput) === -1) {
    alert("Video not available");
  } else {
    $(".iframe").removeClass("hidden");
    $(".videoModal").removeClass("hidden");
    $(".iframe")
      .attr("src", "https://www.youtube.com/embed/" + videoData + "?autoplay=1")
      .addClass("videoPopUp");
  }
}
/************************************
 * getWeatherData
 * @params {undefined} none
 * @returns: {undefined} none
 * Gets weather data from API and appends type of weather based on data received as well as showing temperature
 */
function getWeatherData(position) {
  $(".mainDisplay").empty();
  var lat = position.lat;
  var lng = position.lng;
  var ajaxConfig = {
    url: "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat + "&lon=" + lng + "&APPID=f91cd80c3f28fab67ca696381fb71d30",
    dataType: "json",
    method: "get",
    success: function (response) {
      console.log('response for weather', response);
      var condition = response.list[0].weather[0].main;
      var temp = ((response.list[0].main.temp) * 9 / 5 - 459.67).toFixed(2);
      console.log('temp', temp)
      var symbol;
      switch (condition) {
        case "Haze":
          symbol = "fas fa-cloud";
          break;
        case "Clouds":
          symbol = "fas fa-cloud";
          break;
        case "Clear":
          symbol = "fas fa-sun";
          break;
        case "Rain":
          symbol = "fas fa-umbrella";
          break;
      }
      debugger;
      var conditionSymbol = $("<i>").addClass(symbol);
      $(".weather-info").append(`<p>Mon ${condition}</p> ${temp}°F `);
      // $(".weather-info").append(`${temp}°F `);
    },
    error: function () {
      if (userInput.includes("Beach")) {
        userInput = userInput.replace("Beach", "");
        getWeatherData(userInput);
      }
    }
  };
  $.ajax(ajaxConfig);
}
/************************************
 * getPhotos
 * @params {undefined} none
 * @returns: {undefined} none
 * @calls clearCarousel
 * Gets the photos from Flickr API and appends them to a gallery on the modal
 */
function getPhotos() {
  var theData = {
    api_key: "b5e905e415b7b888752b23f5629b2410",
    method: "flickr.photos.search",
    format: "json",
    nojsoncallback: 1,
    text: userInput + " beach view",
    privacy_filter: 1,
    per_page: 5,
    tags: "beaches, sunset, shoreline, waves, shore,"
  };
  var ajaxOption = {
    data: theData,
    dataType: "json",
    url: "https://api.flickr.com/services/rest",
    method: "GET",
    success: function (response) {
      var photoArray = response.photos.photo;
      clearCarousel();
      for (var pIndex = 0; pIndex < photoArray.length; pIndex++) {
        var currentPhoto = photoArray[pIndex];
        var serverID = currentPhoto.server;
        var photoID = currentPhoto.id;
        var secretID = currentPhoto.secret;
        var url =
          "https://farm1.staticflickr.com/" +
          serverID +
          "/" +
          photoID +
          "_" +
          secretID +
          ".jpg";
        var carouselImage = $(".carousel-image" + (pIndex + 1));
        carouselImage.prepend('<img src="' + url + '" />');
        carouselImage.children().addClass("d-block w-100");
      }
    }
  };
  $.ajax(ajaxOption);
}
/************************************
 * clearCarousel
 * @params {undefined} none
 * @returns: {undefined} none
 * Empties the carousel
 */
function clearCarousel() {
  $(".carousel-item").removeClass('hidden');
}

function createCarousel() {
  $('#carouselExampleIndicators').removeClass('hidden')
  $('#infoTab').addClass('active')
  $('#infoTab').addClass('show')
  $('#foodTab').removeClass('show')
  $('#foodTab').removeClass('active')
  $('#directionsTab').removeClass('show')
  $('#directionsTab').removeClass('active')
  

}

function destroyCarousel() {
  console.log("here")
  $('#infoTab').removeClass('active')
  $('#infoTab').removeClass('show')
  $('#carouselExampleIndicators').addClass('hidden');
  
}

/************************************
 *
 * clearModal
 * @params {undefined} none
 * @returns: {undefined} none
 * Closes the modal
 */
function clearModal() {
  $(".popup-container").css("display", "none");
}
/************************************
 * capitalizeFirstLetters
 * @params {undefined} none
 * @returns: {undefined} none
 * capitalizes the first letter of every word for input
 */
function capitalizeFirstLetters() {
  var inputVal = $(".inputForm").val();
  var tempArr = inputVal.split(" ");
  for (var i = 0; i < tempArr.length; i++) {
    tempArr[i] = tempArr[i].substr(0, 1).toUpperCase() + tempArr[i].substr(1);
  }
  return tempArr.join(" ");
}

function checkUserInput(map) {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: userInput + " beaches",
    fields: ['name', 'geometry'],
    // types: ['locality', "natural_feature"]
  }
  service.textSearch(request, getBeaches);

  function getBeaches(results, status) {
    if (results.length > 0) {
      displayModal();
      $('.tab-address').text(results[0].formatted_address);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (navigator.geolocation) {
          console.log(navigator);
          navigator.geolocation.getCurrentPosition(function (position) {
            var currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            
            $('.modal-title').text(results[0].name);
            lng = results[0].geometry.location.lng();
            lat = results[0].geometry.location.lat();
            var pos = {
              lat: lat,
              lng: lng
            }
            directionObjects = {
              origin: currentPos,
              destination: pos,
              travelMode: "DRIVING",
              avoidTolls: true,
              unitSystem: google.maps.UnitSystem.IMPERIAL,
            }
            var directionsService = new google.maps.DirectionsService
            let display = new google.maps.DirectionsRenderer({
              draggable: false,
              map: map,
            });
            directionsService.route(directionObjects, (response, status) => {
              console.log(response);
              directions = response.routes[0].legs[0].steps;
              if (status === 'OK') {
                if (previousRoute) {
                  previousRoute.setMap(null);
                }
                previousRoute = display;
                display.setDirections(response);
                getYelpData(pos);
                getWeatherData(pos);
                var directions = response.routes[0].legs[0].steps
                $('#directionsTab').empty();
                for (var i = 0; i < directions.length; i++) {

                  var currentDirection = $("<p>").html(directions[i].instructions);
                  $('#directionsTab').append(currentDirection)
                }

              }
            });
            // map.setCenter(pos);
            // marker = new google.maps.Marker({
            //     map: map,
            //     draggable: true,
            //     animation: google.maps.Animation.DROP,
            //     position: pos,
            //                 });
          },
          function () {
            displayModal();
          $('.modal-title').text(results[0].name);
          lng = results[0].geometry.location.lng();
          lat = results[0].geometry.location.lat();
          var pos = {
            lat: lat,
            lng: lng
          }
          getYelpData(pos);
          getWeatherData(pos);
          map.setCenter(pos);
          marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: pos,
          });
            
          })
        } 
      }
    }
    else {
      console.log("NO DATA PLACE ERROR MODEL")
    }
  }
}