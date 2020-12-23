// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");
// console.log(data);

//log each value in data
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

    })

})
