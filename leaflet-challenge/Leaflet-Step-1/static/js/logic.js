//queryUrl with API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

//Define markerSize
function markerSize(magnitude) {
    return magnitude * 7;
  }
  
  //Define colorScale
  function colorScale(magnitude) {
    return magnitude >= 5 ? '#6214F5':
           magnitude >= 4 ? '#B514F5':
           magnitude >= 3 ? '#F705AB':
           magnitude >= 2 ? '#F2AADB':
           magnitude >= 1 ? '#07DDF5':
                            '#28EDB2';
  }
  
   
  function createFeatures(earthquakeData) {
    
    // Function for feature pop-up
    function popUpText(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "<p>Magnitude: " + feature.properties.mag + "</p>" +
        "<p>Type: " + feature.properties.type + "</p>");
    }
    
    // Basic marker features
    var baseMarkerOptions = {
      color: '#2F2F2F',
      weight: 1,
      fillOpacity: 0.7
    }
  
    //GeoJson layer containing the features array on the earthquakeData object***
    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, baseMarkerOptions);
      }, 
      style: function(feature) {
        return {
          radius: markerSize(feature.properties.mag),
          fillColor: colorScale(feature.properties.mag)
        }
      },
      onEachFeature: popUpText
    });
  
    // Send earthquake layer to the createMap function
    createMap(earthquakes);
  }
  
  // GET request for JSON data
  d3.json(queryUrl, function(data) {
    createFeatures(data.features);
  });
  
  //Define streetmap layers
  function createMap(earthquakes) {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      });
    
    
      // Create our map, giving it the streetmap and earthquakes layers on load
      var myMap = L.map("map", {
        //Center map to Eugene, OR
        center: [
          44.05, -123.09
        ],
        zoom: 4.0,
        layers: [streetmap, earthquakes]
      });
  

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
    
    //create legend
    var div = L.DomUtil.create('div', 'legend');
  
    //add labels for legend
    var labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    var grades = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];
  
    //HTML for legend
    div.innerHTML = '<div><strong>Magnitude</strong></div>';
    for(var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style = "background:' + colorScale(grades[i]) + '">&nbsp;</i>&nbsp;&nbsp;'
        + labels[i] + '<br/>';
      };
      return div;
    };
  
    legend.addTo(myMap);
  
   }
