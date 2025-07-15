import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function drawTree(svg, treeData) {
  const nodes = [];
  const links = [];

  function traverse(node) {
    nodes.push(node);
    for (const child of node.children || []) {
      links.push({ source: node, target: child });
      traverse(child);
    }
  }

  traverse(treeData);

  svg.selectAll('line.link')
    .data(links)
    .enter()
    .append('line')
    .attr('x1', d => d.source.position[0])
    .attr('y1', d => d.source.position[1])
    .attr('x2', d => d.target.position[0])
    .attr('y2', d => d.target.position[1])
    .attr('stroke', '#999')
    .attr('stroke-width', 1.5)
    .attr('marker-end', 'url(#arrow)');

  svg.selectAll('rect.node')
    .data(nodes)
    .enter()
    .append('rect')
    .attr('x', d => d.position[0] - 40)
    .attr('y', d => d.position[1] - 15)
    .attr('width', 80)
    .attr('height', 30)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', '#a0d8ef');

  svg.selectAll('text.label')
    .data(nodes)
    .enter()
    .append('text')
    .attr('x', d => d.position[0])
    .attr('y', d => d.position[1] + 5)
    .attr('text-anchor', 'middle')
    .text(d => d.name)
    .attr('font-size', '12px');
}

export default function HorizontalTree({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    drawTree(svg, data);
  }, [data]);

  return <svg ref={ref} width={2000} height={2000} />;
}
