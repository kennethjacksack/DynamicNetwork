document.addEventListener('DOMContentLoaded', () => {
    const svg = d3.select('#edit-timeline-chart');
    const dateInput = document.getElementById('milestone-date');
    const infoInput = document.getElementById('milestone-info');
    const addButton = document.getElementById('add-milestone');
    const saveButton = document.getElementById('save-graph');

    // Set up dimensions and margins
    const margin = {top: 20, right: 30, bottom: 50, left: 60};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create an SVG container
    const g = svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleBand().range([height, 0]).padding(0.1);

    // Define axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Initialize data
    let data = [];

    // Initialize the graph
    function initializeGraph() {
        x.domain([new Date(2020, 0, 1), new Date(2025, 0, 1)]);
        y.domain([]);

        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        g.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
    }

    // Add milestone to the graph
    function addMilestone() {
        const date = new Date(dateInput.value);
        const info = infoInput.value;

        if (date && info) {
            const newData = { date: date.toISOString(), info: info };
            data.push(newData);

            x.domain(d3.extent(data, d => new Date(d.date)));
            y.domain([...new Set(data.map(d => d.info))]);

            g.select('.x.axis').call(xAxis);
            g.select('.y.axis').call(yAxis);

            g.selectAll('.milestone').remove();

            g.selectAll('.milestone')
                .data(data)
                .enter().append('circle')
                .attr('class', 'milestone')
                .attr('cx', d => x(new Date(d.date)))
                .attr('cy', d => y(d.info) + y.bandwidth() / 2)
                .attr('r', 5)
                .attr('fill', 'steelblue');

            dateInput.value = '';
            infoInput.value = '';
        } else {
            alert('Please fill out both fields.');
        }
    }

    // Save the graph and redirect
    function saveGraph() {
        // Save data to localStorage
        localStorage.setItem('graphData', JSON.stringify(data));

        // Redirect to profile page
        window.location.href = 'profile.html';
    }

    addButton.addEventListener('click', addMilestone);
    saveButton.addEventListener('click', saveGraph);

    initializeGraph();
});
