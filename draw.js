// create an array with nodes
let nodes = new vis.DataSet(G.nodes);
//console.log(G.nodes);

// create an array with edges
let edges = new vis.DataSet(G.edges);
//console.log(G.edges)

// create a network
let container = document.getElementById("mynetwork");
let data = {
nodes: nodes,
edges: edges,
};
let options = {};
let network = new vis.Network(container, data, options);

network.selectNodes([1,2], false);
network.selectEdges(["(1,2)"]);
console.log(network.getSelection());
