/*
 * //map.js
 
//Set up some of our variables.
var map; //Will contain map object.
var marker = false; //Has the user plotted their location marker? 
var centerOfMap;    //The center location of our map.
        
//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap(lat, long) {
    centerOfMap = new google.maps.LatLng(lat, long);
    //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 15 //The zoom value.
    };
    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options); 
    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        markerLocation();
    });
}
        
//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    var currentLocation = marker.getPosition();
    //Add lat and lng values to a field that we can save.
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude
}

function locateOnMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        initMap(position.coords.latitude, position.coords.longitude);
    });
}

//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap(52.357971, -6.516758));
*/
var map, infoWindow;
var latG, longG;
function initMap() {
    console.log("algo");
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            latG = pos.lat;
            longG = pos.lng;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

const uri = "http://ninadev.com";

function submitTripInfo()
{
    console.log("submitting");
    var d = new Date();
 //   pageTracker._trackPageview('/thanks.html');
    const item = {
        Name: $("#name").val(),
        Email: $("#email").val(),
        Tel: $("#phone").val(),
        Event: $("#event").val(),
        Msg: $("#message").val(),
        Start_long: latG,
        Start_lat: longG,
        Token: d.getTime()
    };
    console.log(item);
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri + "api/Trip",
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        success: function (result) {
            console.log(result);
            console.log(result["Token"]);
            window.location.href = "/thanks.html";

        }
    });
}
