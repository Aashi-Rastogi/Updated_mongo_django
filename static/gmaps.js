// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
$(document).ready(function () {
    var map = null;
    initMap();
    autoUpdate();
});
function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var origin;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            origin = pos;

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: origin,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infoWindow = new google.maps.InfoWindow({ map: map });
    infoWindow.setPosition(origin);
    infoWindow.setContent('Location found.');
    map.setCenter(origin);
    new google.maps.Marker({
        position: origin,
        map: map,
        icon: 'https://www.robotwoods.com/dev/misc/bluecircle.png'
    });
    if (map.getTilt()) {

        map.setTilt(45);
    }

    //directionsDisplay.setMap(map);

    /*calculateAndDisplayRoute(directionsService, directionsDisplay);
	 var request = {
	  location: origin,
	  radius: 100,
	  types: ['train_station','bus_station','subway_station','transit_station']
	};
	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
	*/
}
/* This is for the direction and route display */
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}
function letsPostIt(data) {
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '/gmaps/pos/',
        data: { location: data },
        contentType: "application/json",
        dataType: 'json'
    });
}
var marker = null;
function autoUpdate() {
    var coords = null;
    navigator.geolocation.getCurrentPosition(function (position) {
        var newPoint = new google.maps.LatLng(position.coords.latitude,
											  position.coords.longitude);
        // Center the map on the new position
        map.setCenter(newPoint);
        letsPostIt(position.coords);
        if (marker) {
            // Marker already created - Move it
            marker.setPosition(newPoint);
        }
        else {
            // Marker does not exist - Create it
            marker = new google.maps.Marker({
                position: newPoint,
                map: map,
                icon: 'https://www.robotwoods.com/dev/misc/bluecircle.png'
            });
        }

    });



    // Call the autoUpdate() function every 5 seconds
    setTimeout(autoUpdate, 5000);
}


function createMarker(place) {

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    var content = '<strong style="font-size:1.2em">' + place.name + '</strong>' +
				'<br/><strong>Latitude:</strong>' + placeLoc.lat() +
				'<br/><strong>Longitude:</strong>' + placeLoc.lng() +
				'<br/><strong>Type:</strong>' + place.types[0] +
				'<br/><strong>Rating:</strong>' + (place.rating || 'n/a');
    var more_content = '<img src="http://googleio2009-map.googlecode.com/svn-history/r2/trunk/app/images/loading.gif"/>';

    //make a request for further details
    service.getDetails({ reference: place.reference }, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            more_content = '<hr/><strong><a href="' + place.url + '" target="details">Details</a>';

            if (place.website) {
                more_content += '<br/><br/><strong><a href="' + place.website + '" target="details">' + place.website + '</a>';
            }
        }
    });


    google.maps.event.addListener(marker, 'click', function () {

        infowindow.setContent(content + more_content);
        infowindow.open(map, this);
    });
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: { lat: 37.77, lng: -122.447 },  // Haight.
        destination: { lat: 37.768, lng: -122.511 },  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode['TRANSIT']
    }, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
}