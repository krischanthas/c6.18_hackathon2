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
        var the_data = {
            term: "beaches",
            location: "irvine",
        }
        var ajaxOption =  {
            data: the_data,
            dataType: 'json',
            url: "https://api.yelp.com/v3/businesses/search",
            headers: {
                Authorization: "Bearer w5ThXNvXEMnLlZYTNrvrh7Mf0ZGQNFhcP6K-LPzktl8NBZcE1_DC7X4f6ZXWb62mV8HsZkDX2Zc4p86LtU0Is9kI0Y0Ug0GvwC7FvumSylmNLfLpeikscQZw41pXW3Yx",
                "Cache-Control": "no-cache",
                "Postman-Token": "9ed2ef7e-20f4-4f46-9901-3f48cb726c22",
              },
            method: 'GET',
            success: function(response) { 
               console.log(response);
                    }
    }
    $.ajax(ajaxOption);
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