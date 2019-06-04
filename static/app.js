function init(){
    d3.csv(("project2_data/Crime_Data_2014.csv")).then((data) => {
   //  console.log(data);
   var population = []
   var violentCrime = []
   var propertyCrime = []
   
    data.forEach(element => {
        element.Population = +element.Population
        element.ViolentCrimerate = +element.ViolentCrimerate
        element.Propertycrimerate = +element.Propertycrimerate
        population.push(element.Population)
        violentCrime.push(element.ViolentCrimerate)
        propertyCrime.push(element.Propertycrimerate)
         
    });
    console.log(data[0])
   
    var trace1 = {
           // x : [1, 2, 3, 4, 5],
           // y : [2, 4, 6, 8, 10],
   
           x : population,
           y : violentCrime,
   
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
       title: 'Plot Title',
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
       Plotly.restyle(chart, 'y', [newdata]);
   }
   function getData(dataset) {
       let data = [];
       switch (dataset) {
           case "dataset1":
           // data =  [1, 2, 3, 39, 45]
           data = propertyCrime
           break;
           case "dataset2":
           data = [10, 20, 30, 37, 52]
           break;
           case "dataset3":
           data =  [100, 200, 300, 23, 432]
           break;
           default:
           data =  [2, 4, 6, 8, 10]    
     }
     updatePlotly(data);
   }
   init();