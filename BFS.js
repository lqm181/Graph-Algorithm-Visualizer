function BFS (G, s) {
    let parents = new Map();
    parents.set(s, null);
    let Q = [];
    Q.push(s);

    while (Q.length > 0) {
        let u = Q.shift();
        // console.log(G.get(u));
        for (const v of G.get(u).keys()) {
            if (!parents.has(v)) {
                parents.set(v, u);
                Q.push(v);
            }
        }
    }

    return parents;
}
console.log(G.V[0]);
console.log(BFS(G.adjList, G.V[0]));