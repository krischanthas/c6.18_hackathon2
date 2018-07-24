$(document).ready(initializeApp);

var userInput;
var userObj = {};

function initializeApp(){
    applyClickHandlers();
    // dropPin();
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

function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(33.6189,-117.9298),
        zoom:13,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 33.6189, lng:  -117.9298},
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































      
//drop pin animation function
//     var markers = [
//         {
//             "title": 'Newport Beach',
//             "lat": '117.1611',
//             "lng": '32.7157',
//             "description": 'Newport Beach'
//         },
// ];
//  function dropPin() {
//     var mapOptions = {
//         center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
//         zoom: 8,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     var infoWindow = new google.maps.InfoWindow();
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
//     var i = 0;
//     var interval = setInterval(function () {
//         var data = markers[i]
//         var myLatlng = new google.maps.LatLng(data.lat, data.lng);
//         var marker = new google.maps.Marker({
//             position: myLatlng,
//             map: map,
//             title: data.title,
//             animation: google.maps.Animation.DROP
//         });
//         (function (marker, data) {
//             google.maps.event.addListener(marker, "click", function (e) {
//                 infoWindow.setContent(data.description);
//                 infoWindow.open(map, marker);
//             });
//         })(marker, data);
//         i++;
//         if (i == markers.length) {
//             clearInterval(interval);
//         }
//     }, 200);
// }