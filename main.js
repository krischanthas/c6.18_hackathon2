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

getData();

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
        success: function(response) {
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    }
    
    $.ajax(settings);
    
}

    
//     function getPhotos() {
//         var the_data = {
//             api_key: "b5e905e415b7b888752b23f5629b2410",
//             method: "flickr.photos.search",
//             format: "json",
//             nojsoncallback: 1,
//             text: "",
//             privacy_filter: 1,
//             per_page: 10,
//         }
        
//         var ajaxOption =  {
//             data: the_data,
//             dataType: 'json',
//             url: "https://api.flickr.com/services/rest",
//             method: 'GET',
//             success: function(response) { 
//                console.log(response);
//                          var photoArray = response.photos.photo;
//                          console.log(photoArray);
//                          for (var pIndex = 0; pIndex < photoArray.length; pIndex++) {
//                             debugger;
//                              var currentPhoto = photoArray[pIndex];
//                              var serverID = currentPhoto.server;
//                              var photoID = currentPhoto.id;
//                              var secretID = currentPhoto.secret;
//                              var url = "https://farm1.staticflickr.com/" + serverID + "/" + photoID + "_" + secretID + ".jpg";
//                             console.log(url);
//                             var newDiv = $('<div>'); 
//                            $(".brand").prepend('<img src="'+url+'" />');
//                          }
//                         }
//                     }
// $.ajax(ajaxOption);
//                     }