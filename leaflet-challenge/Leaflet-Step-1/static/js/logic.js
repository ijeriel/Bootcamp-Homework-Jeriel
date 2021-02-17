//queryUrl with API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
//for later
// var tectonicplates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

//Define markerSize
function markerSize(depth) {
    return depth * 7;
  }
  
  //Define magnitude(depth) colors
  function colorMag(depth) {
    return depth >= 5 ? '#6214F5':
           depth >= 4 ? '#B514F5':
           depth >= 3 ? '#F705AB':
           depth >= 2 ? '#F2AADB':
           depth >= 1 ? '#07DDF5':
                        '#28EDB2';
  }
     
  function createFeatures(earthquakeData) {
    
    //Function for pop up text box
    function popUpText(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr>" + new Date(feature.properties.time) + "<h3>Magnitude: " + feature.properties.mag + "</h3>");
    }
    
    //Default marker options
    var baseMarkerOptions = {
      color: '#000000',
      weight: 0.5,
      fillOpacity: 0.7
    }
  
    //GeoJson layer containing the features array on the earthquakeData object
    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, baseMarkerOptions);
      }, 
      style: function(feature) {
        return {
          radius: markerSize(feature.properties.mag),
          fillColor: colorMag(feature.properties.mag)
        }
      },
      onEachFeature: popUpText
    });
  
    //Send earthquake layer to the createMap function
    createMap(earthquakes);
  }
  
  //GET request for JSON data
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
    
    
      //Create map, giving it the streetmap and earthquakes layers on load
      var quakeMap = L.map("map", {
        //Center map to Eugene, OR
        center: [
          44.05, -123.09
        ],
        zoom: 4.0,
        layers: [streetmap, earthquakes]
      });
  
    //Create legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'legend');
    var labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    var mag = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];
  
    //HTML legend
    div.innerHTML = '<div><strong>Earthquake Magnitude</strong></div>';
    for(var i = 0; i < mag.length; i++) {
        div.innerHTML += '<i style = "background:' + colorMag(mag[i]) + '">&nbsp;</i>&nbsp;&nbsp;' + labels[i] + '<br/>';
      };
      return div;
    };
    
    legend.addTo(quakeMap);
  
   }
