function init(){
    d3.json(("/metadata")).then((data) => {
    console.log(data.keys[0].population);
   var population = [];
   var cityName = []
//    var propertyCrime = []
   
    data.keys.forEach(element => {
        // element.Population = +element.Population
        // element.ViolentCrimerate = +element.ViolentCrimerate
        // element.Propertycrimerate = +element.Propertycrimerate
        population.push(element.population)
        cityName.push(element.city)
        // propertyCrime.push(element.Propertycrimerate) 
    });
   
    var trace1 = {
        //    x : [1, 2, 3, 4, 5],
        //    y : [2, 4, 6, 8, 10],
   
           x : population,
           y : population,
   
           mode: 'markers',
           type : "scatter",
           name: 'City Name',
           text: cityName,
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
    //    Plotly.relayout(chart, 'xaxis.title.text', [newtitle])
   }
   function getData(dataset) {
       let data = [];
       switch (dataset) {
           case "dataset1":
           data =  [1, 2, 3, 39, 45]
        //    data = propertyCrime
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
//    function getXTitle(title){
//        let xtitle = ''
//        switch (title){
//            case "dataset1":
//                xtitle = 'X Var 1'
//            break;
//            case "dataset2":
//                 xtitle = 'X Var 2'
//            break;
//            case "dataset3":
//                 xtitle = 'X Var 3'
//            break;
//        }
//        updatePlotly(xtitle);
//    }
   init();