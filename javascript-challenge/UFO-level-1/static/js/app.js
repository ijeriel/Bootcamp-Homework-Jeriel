// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");
// console.log(data);

function build(data) {

    tbody.html("");
    data.forEach(function(ufoReport) {
        console.log(ufoReport);
    
        //create table row elements
        var row = tbody.append("tr");
    
        //extract key value pairs
        Object.entries(ufoReport).forEach(function([key, value]){
            console.log(key, value);
    
            //append td element to rows
            var cell = row.append("td");
    
            //add data to object
            cell.text(value)
    
        });
    
    });
}
//log each value in data
// data.forEach(function(ufoReport) {
//     console.log(ufoReport);

//     //create table row elements
//     var row = tbody.append("tr");

//     //extract key value pairs
//     Object.entries(ufoReport).forEach(function([key, value]){
//         console.log(key, value);

//         //append td element to rows
//         var cell = row.append("td");

//         //add data to object
//         cell.text(value)

//     });

// });

//select button
var button = d3.select("#filter-btn");
var field = d3.select("#datetime");

//create event handlers
button.on("click", runEnter);
field.on("submit", runEnter);
// form.on("submit", runEnter);

function runEnter() {

    //prevent page from refreshing
    d3.event.preventDefault();

    //select input element from html
    var inputElement = d3.select("#datetime");

    //get value property of element
    var inputValue = inputElement.property("value");
    console.log(inputValue);
    console.log(tableData);

    //use form to filter by date
    var filteredData = tableData.filter(day => day.datetime === inputValue);
    console.log(filteredData);
    build(filteredData);
}
build(data);
