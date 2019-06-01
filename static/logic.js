function createMap(citiesPlot) {

    // Create the tile layer that will be the background of our map
    const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // Create Darkmap background
    const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // Create satellite Background
    const satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    })

    // Create a baseMaps object to hold the lightmap layer
    const baseMaps = {
        "Light Map": lightmap,
        "Dark Map" : darkmap,
        "Satellite Image" : satellite
    };

    // Create an overlayMaps object to hold the quakePlot layer
    let overlayMaps = {
        "<b>US Cities Data!</b><hr>Click a Circle for more info!<br>": citiesPlot
    };

    // Create the map object with options
    let map = L.map("map-id", {
        center: [35.73, -90],
        zoom: 3,
        layers: [lightmap, darkmap, satellite, citiesPlot]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Create and add Legend
};

function createCircleMarkers(response) {

    cities = response.key
    // Pull the features from response
    const citiesMarkers = cities.map(city => {

        // For each city, create a marker and bind a popup with the city's name
        // coords from response contain a depth field, slice removes this
        // Reverse swaps lat and lng to map locations correctly

        const coords = city.coordinates

        // Change the values of these options to change the symbol's appearance    
        let options = {
            radius: city.population/500,
            fillColor: "lightgreen",
            color: "lightgreen",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5
          }
          
        // new Date parses Epoch time from JSON into human readable date&time
        const popupMsg = "<h3>" + city.city+ ", " + city.state + "<h3><h3>Population: " + city.population+ "<h3>";
        const citiesMarkers = L.circle(coords, options).bindPopup(popupMsg);

        // Add the marker to the quakeMarkers array
        return citiesMarkers;
    })

    // Create a layer group made from the quakeMarkers array, pass it into the createMap function
    createMap(L.layerGroup(citiesMarkers));
}

// Perform an API call to the USGS earthquake API to get quake info. Call createCircleMarkers when complete
(async function(){
    const metadataUrl = "/metadata"
    let response = await d3.json(metadataUrl)
    // console.log(response) For analysis in terminal
    console.log(response)
    createCircleMarkers(response)
})()


// BUILD DROPDOWN SELECTOR
// function buildDropdown(metric) {

//     // @TODO: function to build metadata panel Use `d3.json` to fetch the metadata for a sample @app.route("/metadata/<sample>")
//     const metadataUrl = "/metadata" ; 
  
//     // Use d3 to select the panel with id of `#metric-metadata`
//     const metadataVariable = d3.select('city-metadata')
   
//     // clear existing metadata
//     metadataVariable.html("")
  
//     // Use `Object.entries` to add each key and value pair to the panel Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
    
//     async function getVars() {
//       let jsonMeta = await d3.json(metadataUrl);
//       //Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided
//     //   jsonMeta.map(key => {values
//     //     .append("h6")
//     //     .html(`<b>${key}</b>  :  ${values}`) // how to append multi w/o literal?
//     //     });
//       }
//     getVars();
//   }
  
// function init() {
    // Grab a reference to the dropdown select element
    // var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    // cityDicts = d3.json("/metadata")
    // const p = Promise.resolve(cityDicts)
    // cityVars = []
    // cityDicts.then(function(data) {data.map((city) => {
    //         citiesList = (city['city'])
    //         popList = (city['population'])
    //         latList = (city['lat'])
    //         lngList = (city['lng'])
    //         // cityVars.push(citiesList, popList, latList, lngList)
    //         // console.log(cityVars)
    //       });})

    // cityDicts.then(function (data){data.forEach((city) => {
      // cityVar.forEach((key) => {
      //   selector
      //     .append("option")
      //     .text(key)
      //     .property("value", key);
      // });
  
    //   Use the first sample from the list to build the initial plots
      // const firstVar = cityVar[0];
      // buildCharts(firstVar);
    //    buildDropdown(firstVar);
    //  };
// 
  // function optionChanged(newVar) {
    // Fetch new data each time a new sample is selected
    // buildCharts(newSample);
  //   buildDropdown(newVar);
  // }
  
  // Initialize the dashboard
  // init();