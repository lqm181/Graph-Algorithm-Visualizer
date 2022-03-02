class Graph {
    
    constructor (numNodes, isDirected, isSelfEdged) 
    {
        this.numNodes = numNodes;
        this.adjList = new Map();
        this.V = [];
        this.nodes = [];
        this.edges = [];

        // Conditions
        this.isDirected = isDirected;
        this.isSelfEdged = isSelfEdged;

        // Default values
        this.MAX_EDGES_PER_NODE = isSelfEdged ? numNodes : numNodes - 1;

        this.createGraph();
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    createGraph () {
        for (let i = 1; i <= this.numNodes; i++) {
            // The possible number of edges for node
            let freeEdges = Math.floor(Math.random() * this.MAX_EDGES_PER_NODE);
            this.V.push(new Node(i, freeEdges)); 
            this.nodes.push(nodeInfo(i));          
        }

        this.V.forEach((node) => this.createEdges(node));
    } 

    createEdges (node) {
        // If node has not already been initialized:
        if (!this.adjList.has(node)) {
            this.adjList.set(node, new Map());
        }

        let copyV = this.V.slice(0);
        this.shuffle(copyV);
        
        // Generate the neighbors of node 
        let i = 0;
        while ((node.freeEdges > 0) && (i < this.MAX_EDGES_PER_NODE)) {
            let neighbor = copyV[i];
            i++;

            // Invalid neighbor if a self-edge in a non-self-edged graph
            if (!this.isSelfEdged && neighbor == node) {
                continue
            }

            if (neighbor.freeEdges > 0) {
                // Valid neighbor
                this.adjList.get(node).set(neighbor, new Edge(node, neighbor));
                this.edges.push(edgeInfo(node, neighbor))

                // For undirected graph: edge(u,v) -> edge(v,u)
                if (!this.isDirected) {
                    if (!this.adjList.has(neighbor)) {
                        this.adjList.set(neighbor, new Map());
                        this.adjList.get(neighbor).set(node, new Edge(neighbor, node));
                    } else {
                        this.adjList.get(neighbor).set(node, new Edge(neighbor, node));
                    }   
                }

                node.freeEdges--;
            }        
        }
    }
}

class Node {
    constructor (id, freeEdges)
    {
        this.id = id;
        this.freeEdges = freeEdges;
    }

}

// Create a dictionary storing the info of the node for drawing with vis.js
function nodeInfo (id) { 
    return {
        id: id,
        label: id.toString(),
        color: {
            background: "white", 
            border: "black"
        }
     };
}

/** 
 * Create a dictionary storing the info of the edge between 2 nodes u and v
 * @param u is a Node object
 * @param v is a Node object representing one of u's neighbors
 */
function edgeInfo(u,v) {
    return {
        from: u.id, 
        to: v.id,
        id: "(" + u.id.toString() + "," + v.id.toString() + ")",
        color: "black"
    };
}

class Edge {

    constructor (u, v) 
    {
        this.u = u;
        this.v = v;
        // undirected / one-way / two-way
    }

}

let G = new Graph(10, false, false);