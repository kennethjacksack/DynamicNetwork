// Function to initialize the D3 graph
function initializeGraph() {
    const svg = d3.select("#network")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    const g = svg.append("g");

    const zoom = d3.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(
            parseFloat(svg.style("width")) / 2,
            parseFloat(svg.style("height")) / 2
        ));

    return { svg, g, simulation };
}

// Global variables to store nodes, svg, and simulation
let nodes = [];
let svg, g, simulation;

// Initialize the graph and store svg, g, and simulation
function setupGraph() {
    ({ svg, g, simulation } = initializeGraph());
}

// Function to add a node
function addNode(name, industry) {
    if (!svg || !g || !simulation) setupGraph(); // Ensure graph is initialized

    const svgWidth = parseFloat(svg.style("width"));
    const svgHeight = parseFloat(svg.style("height"));

    const nodeData = { 
        id: Date.now(), 
        name: name,
        industry: industry,
        x: svgWidth / 2,
        y: svgHeight / 2,
        radius: 12 // Define radius for the node
    };

    // Add the node data to the global nodes array
    nodes.push(nodeData);

    // Update the graph with the new node
    updateGraph();
}

// Function to edit a node
function editNode(updatedNode) {
    if (!svg || !g || !simulation) setupGraph(); // Ensure graph is initialized

    // Find the node in the global nodes array
    const nodeIndex = nodes.findIndex(node => node.id === updatedNode.id);

    if (nodeIndex !== -1) {
        // Update the node data in the global nodes array
        nodes[nodeIndex].name = updatedNode.name;
        nodes[nodeIndex].industry = updatedNode.industry;

        // Update the graph with the new data
        updateNodeLabels();
    } else {
        console.error("Node not found.");
    }
}

// Function to update node labels
function updateNodeLabels() {
    if (!g) setupGraph(); // Ensure graph is initialized

    // Bind the updated nodes data to the text elements
    const labelSelection = g.selectAll("text").data(nodes, d => d.id);

    // Update the labels
    labelSelection
        .attr("x", d => d.x)
        .attr("y", d => d.y + d.radius + 15)
        .text(d => d.name);

    // Handle entering and exiting text elements
    labelSelection.enter()
        .append("text")
        .attr("class", "node-label")
        .attr("x", d => d.x)
        .attr("y", d => d.y + d.radius + 15)
        .text(d => d.name)
        .attr("font-size", "12px")
        .attr("text-anchor", "middle");

    labelSelection.exit().remove(); // Remove old labels
}

// Function to update the graph with new or edited nodes
function updateGraph() {
    if (!svg || !g || !simulation) setupGraph(); // Ensure graph is initialized

    // Bind the updated nodes data to the circles
    const nodeSelection = g.selectAll("circle").data(nodes, d => d.id);

    // Update the circles
    nodeSelection
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    // Handle entering and exiting circles
    nodeSelection.enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", d => d.radius)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .merge(nodeSelection);

    nodeSelection.exit().remove(); // Remove old circles

    // Update node labels
    updateNodeLabels();

    // Restart the simulation
    simulation.nodes(nodes);
    simulation.alpha(1).restart();
}

// Call setupGraph to initialize the graph on load
setupGraph();
