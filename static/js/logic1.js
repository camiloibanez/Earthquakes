var myMap = L.map("map", {
    center: [40, -80],
    zoom: 3
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

function colors(magnitude) {
    switch (true) {
        case magnitude < 1:
            return "#F5ECCE";
        case magnitude < 2:
            return "#F3E2A9";
        case magnitude < 3:
            return "#F5DA81";
        case magnitude < 4:
            return "#F7D358";
        case magnitude < 5:
            return "#FACC2E";
        case magnitude < 6:
            return "#FFBF00";
        case magnitude < 7:
            return "#FF8000";
        case magnitude < 8:
            return "#FF4000";
        case magnitude < 9:
            return "#FF0000";
        case magnitude <= 10:
            return "#DF0101";
        default:
            return "#F7F2E0";
    }
};

function sizes(magnitude) {
    switch (true) {
        case magnitude < 1:
            return 5;
        case magnitude < 2:
            return 8;
        case magnitude < 3:
            return 11;
        case magnitude < 4:
            return 14;
        case magnitude < 5:
            return 17;
        case magnitude < 6:
            return 20;
        case magnitude < 7:
            return 23;
        case magnitude < 8:
            return 26;
        case magnitude < 9:
            return 29;
        case magnitude <= 10:
            return 32;
        default:
            return 5;
    }

};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latLon) {
            return L.circleMarker(latLon, {
                radius: sizes(feature.properties.mag),
                fillColor: colors(feature.properties.mag),
                color: "black",
                weight: 0.6,
                Opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><h3>magnitude: ${feature.properties.mag}</h3>`)
        }
    }).addTo(myMap);
});

