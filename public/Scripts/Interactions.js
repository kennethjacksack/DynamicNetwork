export function addNode(data, updateGraph) {
    const nodeId = `node${data.nodes.length}`;
    data.nodes.push({ id: nodeId, group: Math.floor(Math.random() * 10) });
    updateGraph();
}

export function addLink(data, updateGraph) {
    if (data.nodes.length < 2) return;

    const source = data.nodes[Math.floor(Math.random() * data.nodes.length)];
    let target;
    do {
        target = data.nodes[Math.floor(Math.random() * data.nodes.length)];
    } while (target === source);

    data.links.push({ source: source.id, target: target.id, value: 1 });
    updateGraph();
}
