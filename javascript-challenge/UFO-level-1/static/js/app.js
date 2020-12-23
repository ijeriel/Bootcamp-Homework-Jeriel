// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");
// console.log(data);
data.forEach(function(ufoReport) {
    console.log(ufoReport);
    var row = tbody.append("tr");
})
