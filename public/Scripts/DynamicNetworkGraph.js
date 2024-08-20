document.addEventListener('DOMContentLoaded', function() {
    const width = 800;
    const height = 600;

    const svg = d3.select("#network-graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g");

    const nodes = [
        { id: 1, name: "Friend" },
        { id: 2, name: "You" },
        { id: 3, name: "Boss" }
    ];

    const links = [
        { source: 1, target: 2 },
        { source: 2, target: 3 }
    ];

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-10))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(30))
        .on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label
                .attr("x", d => d.x - 10)
                .attr("y", d => d.y + 15);
        });

    const link = g.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", "#333")
        .style("stroke-width", ".2px");

    const node = g.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", "#102770")
        .style("stroke", "none")
        .call(drag(simulation))
        .on("mouseover", function(event, d) {
            if (!d.dragging) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("fill", "#ffeba7")
                    .attr("r", 7);

                link.filter(l => l.source === d || l.target === d)
                    .style("stroke", "#ffeba7")
                    .style("stroke-width", "1.5px");
            }
        })
        .on("mouseout", function(event, d) {
            if (!d.dragging) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("fill", "#102770")
                    .attr("r", 5);

                link.filter(l => l.source === d || l.target === d)
                    .style("stroke", "#333")
                    .style("stroke-width", ".2px");
            }
        });

    const label = g.selectAll(".label")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .text(d => d.name)
        .style("font-size", "10px")
        .style("fill", "#333");

    const zoom = d3.zoom()
        .scaleExtent([0.5, 2])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    setTimeout(() => {
        const bounds = g.node().getBBox();
        const parent = svg.node().parentNode;
        const fullWidth = parent.clientWidth;
        const fullHeight = parent.clientHeight;

        const widthRatio = fullWidth / bounds.width;
        const heightRatio = fullHeight / bounds.height;
        const ratio = Math.min(widthRatio, heightRatio) * .25;

        const transform = d3.zoomIdentity
            .translate((fullWidth - bounds.width * ratio) / 2 - bounds.x * ratio,
                (fullHeight - bounds.height * ratio) / 2 - bounds.y * ratio)
            .scale(ratio);

        svg.transition().duration(2500).call(zoom.transform, transform);

        setTimeout(() => {
            node.classed("fade-in", true);
            link.classed("fade-in", true);
            label.classed("fade-in", true);
        }, 100);

    }, 100);

    function drag(simulation) {
        return d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
                d.dragging = true;
                d3.select(this)
                    .style("fill", "#ffeba7")
                    .attr("r", 7);

                link.filter(l => l.source === d || l.target === d)
                    .style("stroke", "#ffeba7")
                    .style("stroke-width", "1.5px");
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
                label
                    .filter(node => node.id === d.id)
                    .attr("x", event.x - 15)
                    .attr("y", event.y + 15);
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
                d.dragging = false;

                setTimeout(() => {
                    if (!d.dragging) {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("fill", "#102770")
                            .attr("r", 5);

                        link.filter(l => l.source === d || l.target === d)
                            .style("stroke", "#333")
                            .style("stroke-width", ".2px");
                    }
                }, 500);  // 0.5 second delay before checking if still dragging
            });
    }
});
