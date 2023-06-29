// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    console.log(data); 
    // Once we get a response, send the data.features object to the createFeatures function.
    // createFeatures(data.features);
    // function createFeatures(earthquakeData) {
    // function onEachFeature(feature, layer) {
    //   layer.bindPopup(`<h3>${feature.geometry.coordinates}</h3>`);
    // }
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    // let earthquakes = L.geoJSON(earthquakeData, {
    // onEachFeature: onEachFeature
    // });

     // Send our earthquakes layer to the createMap function/
  //    createMap(earthquakes);
  // }
    // Once we get a response, send the data.features object to the createFeatures function.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
    
  // var marker = L.marker([data.features[24].geometry.coordinates[1], data.features[24].geometry.coordinates[0]], {
  //   draggable: true,
  //   title: "My First Marker"
  // }).addTo(myMap);
  // marker.bindPopup("Hello There!");

  // Define array to hold the created earthquake markers.
     let earthquakes = [];
     

// Loop through locations, and create the city and state markers.
     for (let i = 0; i < data.features.length; i++) {
  
      // Conditionals for depth
      let color = "";
      if (data.features[i].geometry.coordinates[2] > 90) {
        color = "navy";
      }
      else if (data.features[i].geometry.coordinates[2] > 70) {
        color = "purple";
      }
      else if (data.features[i].geometry.coordinates[2] > 50) {
        color = "maroon";
      }
      else if (data.features[i].geometry.coordinates[2] > 30) {
        color = "red";
      }
      else if (data.features[i].geometry.coordinates[2] > 10) {
        color = "orange";
      }
      else {
        color = "yellow";
      }
  
      // add circles with radius based on quake magnitude
     earthquakes.push(
      L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], 
     {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: 50000 * (data.features[i].properties.mag) 
      }
      ).bindPopup(`<h3>Magnitude: ${data.features[i].properties.mag}</h3><hr><h3>Depth: ${data.features[i].geometry.coordinates[2]}<h3><hr><p> Loc: ${data.features[i].properties.place}`)
     );
    };
    
    
    let quakes = L.layerGroup(earthquakes);

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        9.93, 78.12
      ],
      zoom: 3.2,
      layers: [street, quakes]
    });
    console.log(data.features[0].properties.mag);
  })