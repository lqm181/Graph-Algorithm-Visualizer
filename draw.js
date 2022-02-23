// create an array with nodes
var nodes = new vis.DataSet(G.nodes);
console.log(G.nodes);

// create an array with edges
var edges = new vis.DataSet(G.edges);
console.log(G.edges)

// create a network
var container = document.getElementById("mynetwork");
var data = {
nodes: nodes,
edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);
