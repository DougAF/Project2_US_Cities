// Scatter Plots D3
// (async function(){
//     const 
//        svgWidth = 960;
//        svgHeight = 500;

//     const margin = {
//         top: 20,
//         right: 40,
//         bottom: 80,
//         left: 100
//     };

//     const width = svgWidth - margin.left - margin.right;
//     const height = svgHeight - margin.top - margin.bottom;

//     const svg = d3.select("#scatter")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

//     const chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     const data = await d3.csv("Crime_Data_2014.csv");
//     console.log(data);

//     const xLinearScale = d3.scaleLinear()
//      .domain([d3.min(data, d => d.Population), d3.max(data, d => d.Population)])
//      .range([0, width]);


//     const yLinearScale = d3.scaleLinear()
//      .domain([d3.min(data, d => d.ViolentCrimerate), d3.max(data, d => d.ViolentCrimerate)])
//      .range([height, 0]);

//     const bottomAxis = d3.axisBottom(xLinearScale);
//     const leftAxis = d3.axisLeft(yLinearScale);
 
//     chartGroup.append("g")
//      .attr("transform", `translate(0, ${height})`)
//      .call(bottomAxis);
 
//     chartGroup.append("g")
//      .call(leftAxis);

//     circlesGroup = chartGroup.selectAll("circle")
//      .data(data)
//      .enter()
//      .append("circle")
//      .attr("cx", d => xLinearScale(d.Population))
//      .attr("cy", d => yLinearScale(d.ViolentCrimerate))
//      .attr("r", "3")
//      .attr("fill", "blue")
//      .attr("opacity", ".75")
     
//     chartGroup.append("text")
//      .attr("transform", "rotate(-90)")
//      .attr("y", 0 - margin.left + 40)
//      .attr("x", 0 - (height / 2))
//      .attr("dy", "1em")
//      .attr("class", "axisText")
//      .text("Violent Crime Rate");

//     chartGroup.append("text")
//      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//      .attr("class", "axisText")
//      .text("Population");
// })()

//Scatter Plots Plotly
// (async function(){

//     const cityData = await d3.csv("Crime_Data_2014.csv");
//     console.log(cityData);
//     // console.log(cityData[5].Population);

//     cityData.forEach(function(data){
//         data.Population = +data.Population
//         data.ViolentCrimerate = +data.ViolentCrimerate
//     });

//     var trace1 = {
//         // x : [1, 2, 3, 4, 5],
//         // y : [2, 4, 6, 8, 10],

//         x : cityData.Population,
//         y : cityData.ViolentCrimerate,

//         mode: 'markers',
//         type : "scatter",
//         marker : {size: 6}

//     };

//     var sData = [trace1];

//     var layout = {
//         height: 600,
//         width: 800,
//         // xaxis: {
//         //     range : [d3.min(cityData, d => d.Population), d3.max(cityData, d => d.Population)]
//         // },
//         // yaxis: {
//         //     range : [d3.min(cityData, d => d.ViolentCrimerate), d3.max(cityData, d => d.ViolentCrimerate)]
//         // }
//     };

//     // Plotly.newPlot('scatter', sData, layout);

// })()

function init(){
 d3.csv(("Crime_Data_2014.csv")).then((data) => {
 console.log(data[0]);

 var trace1 = {
        x : [1, 2, 3, 4, 5],
        y : [2, 4, 6, 8, 10],

        // x : data[0].Population,
        // y : data[0].ViolentCrimerate,

        mode: 'markers',
        type : "scatter",
        name: 'City Name',
        text: ['a','b', 'c','d','e'],
        marker : {size: 6}
        };
    
 var sData = [trace1];

 var layout = {
    height: 600,
    width: 800,
    xaxis: {
        title: {
            text:'X Variable'
        }
    },
    yaxis: {
        title: {
            text: 'Business Growth'
        }
    }
  };

  Plotly.plot('scatter', sData, layout);
 })
 
}

function updatePlotly(newdata) {
    const chart = document.getElementById("scatter");
    Plotly.restyle(chart, "y", [newdata]);
}
function getData(dataset) {
    let data = [];
    switch (dataset) {
        case "dataset1":
        data = [1, 2, 3, 39, 45];
        break;
        case "dataset2":
        data = [10, 20, 30, 37, 52];
        break;
        case "dataset3":
        data = [100, 200, 300, 23, 432];
        break;
        default:
        data = [2, 4, 6, 8, 10];
  }
  updatePlotly(data);
}
init();