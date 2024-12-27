// window.onload = getMyLocation;

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

var map;

function getMyLocation() {
    console.log("Calling getMyLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
    showMap(position.coords);
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 15,
        center: googleLatAndLong
        // mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    console.log(map)
    console.log("finished showMap")
}