
class map {

    constructor() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38, lng: 24 },
            zoom: 8
        });
        this.infoWindow = new google.maps.InfoWindow;
    }

    geolocation() {
        // Try HTML5 geolocation.
        var cont = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                cont.infoWindow.setPosition(pos);
                cont.infoWindow.setContent('Location found.');
                cont.infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                console.log("Location not provided");
            });
        }
    }

    search() {
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        var cont = this;
        cont.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        cont.map.addListener('bounds_changed', function () {
            searchBox.setBounds(cont.map.getBounds());
        });

        let markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: cont.map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                cont.mark = place;
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            cont.map.fitBounds(bounds);
        });
    }

    getPlace() {
       return this.mark;
    }
}

function initMap() {
    this.mp = new map();
    // mp.geolocation();
    mp.search();
}

// function getPlace(){
//     mp.getPlace();
// }