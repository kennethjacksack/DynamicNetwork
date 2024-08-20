import { initializeGraph, updateGraph } from './graph.js';
import { addNode, addLink } from './interactions.js';

const data = { nodes: [], links: [] };

const svg = initializeGraph(data);

document.getElementById('addNode').addEventListener('click', () => {
    addNode(data, svg);
    updateGraph(data, svg);
});

document.getElementById('addLink').addEventListener('click', () => {
    addLink(data, svg);
    updateGraph(data, svg);
});
