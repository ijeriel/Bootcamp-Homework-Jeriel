//queryUrl with API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
//var queryTechtonic = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json"


//Perform d3 GET request to query URL
d3.json(queryUrl, function(data) {
//Send response to createFeatures function
    createFeatures(data.features);
});

// Define a markerSize function that will give each earthquake radius based on its 3rd coordinate
// function markerSize(population) {
//     return population / 40;
//   }


function createFeatures(earthquakeData) {
    createMap(earthquakeData);
    //function for layer
    function onEachFeature(feature, layer) {
        // for (var i = 0; i < earthquakes.length; i++) {
            // console.log(earthquakeData[i].geometry.coordinates.slice(0, 2))
            layer.circleMarker(feature.geometry.coordinates.slice(0, 2), {
              fillOpacity: 0.75,
              color: "white",
              fillColor: "purple",
              // Setting our circle's radius equal to the output of our markerSize function
              // This will make our marker's size proportionate to its population
              radius: feature.properties.mag
            }).bindPopup("<h1>City" + feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3>");
        // }
        // layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

//GeoJson layer containing the features array on the earthquakeData object***
    var earthquakes = L.geoJSON(earthquakeData, {
    //   pointToLayer:
        onEachFeature: onEachFeature
    }).addTo(myMap);

//Send earthquakes layer to createMap
    // createMap(earthquakes);
}

function createMap(earthquakes) {

    //Define streetmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

  //Define baseMaps object for the base layer
  // Define a baseMaps object to hold our base layer
    var baseMaps = {
        "Street Map": streetmap
    };

  // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

//     var forTechtonic = new L.layerGroup();
//   // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });
//     d3.json(queryTechtonic, function(tdata) {
//         L.geoJSON(tdata, {
//             color: "gold",
//             weight: 2
//         })
//         .addTo(forTechtonic);
//     });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // for (var i = 0; i < earthquakes.length; i++) {
    //     // console.log(earthquakeData[i].geometry.coordinates.slice(0, 2))
    //     L.circle(earthquakes[i].geometry.coordinates.slice(0, 2), {
    //       fillOpacity: 0.75,
    //       color: "white",
    //       fillColor: "purple",
    //       // Setting our circle's radius equal to the output of our markerSize function
    //       // This will make our marker's size proportionate to its population
    //       radius: earthquakes[i].properties.mag
    //     }).bindPopup("<h1>City" + earthquakes[i].properties.place + "</h1> <hr> <h3>Magnitude: " + earthquakes[i].properties.mag + "</h3>").addTo(myMap);
    // }
    //Send earthquakes layer to createMap
    // createMap(earthquakes);
}

// function createMap(earthquakes) {

// //Define streetmap layers
// var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//   //Define baseMaps object for the base layer
//   // Define a baseMaps object to hold our base layer
//   var baseMaps = {
//     "Street Map": streetmap,
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [streetmap, earthquakes]
//   });


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);


// }