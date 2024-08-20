// graph.js

document.addEventListener('DOMContentLoaded', function () {
    // Example data, replace with your own
    var graphData = {
        "nodes": [
            {"id": "1", "name": "Node 1"},
            {"id": "2", "name": "Node 2"},
            {"id": "3", "name": "Node 3"}
        ],
        "links": [
            {"source": "1", "target": "2"},
            {"source": "2", "target": "3"}
        ]
    };

    // Set up dimensions and margins
    var width = 800;
    var height = 600;

    // Create SVG container
    var svg = d3.select('#timeline-chart')
        .attr('width', width)
        .attr('height', height);

    // Set up force simulation
    var simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

    // Create link elements
    var link = svg.selectAll('.link')
        .data(graphData.links)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke', '#999')
        .style('stroke-opacity', 0.6)
        .style('stroke-width', '1.5px');

    // Create node elements
    var node = svg.selectAll('.node')
        .data(graphData.nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .style('fill', '#ff5722')
        .call(drag(simulation));

    // Add node labels
    svg.selectAll('.label')
        .data(graphData.nodes)
        .enter().append('text')
        .attr('class', 'label')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .text(d => d.name);

    // Update positions
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        svg.selectAll('.label')
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });

    // Drag behavior
    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
});
