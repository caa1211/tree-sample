export function layoutTree(tree, dx = 100, dy = 60) {
  const used = new Set();
  const key = (x, y) => `${x}|${y}`;

  function buildChain(start, depth) {
    const chain = [];
    let node = start;
    let d = depth;
    while (node) {
      chain.push({ node, x: d });
      const kids = node.children || [];
      if (kids.length === 0) break;
      node = kids[0];
      d++;
    }
    return chain;
  }

  function placeChain(chain, startY) {
    let y = startY;
    while (true) {
      const conflict = chain.some(({ x }) => used.has(key(x, y)));
      if (!conflict) break;
      y++;
    }
    chain.forEach(({ node, x }) => {
      node.position = [x * dx, y * dy];
      used.add(key(x, y));
    });
    return y;
  }

  function layoutSubtree(node, depth, startY) {
    const chain = buildChain(node, depth);
    const y = placeChain(chain, startY);
    for (const { node: n, x } of chain) {
      const kids = n.children || [];
      if (kids.length <= 1) continue;
      let nextY = y + 1;
      for (let i = 0; i < kids.length; i++) {
        if (i === 0) continue; // already placed
        nextY = layoutSubtree(kids[i], x + 1, nextY);
        nextY++;
      }
    }
    return Math.max(...chain.map(({ node }) => node.position[1] / dy));
  }

  tree.position = [0, 0];
  used.add(key(0, 0));
  if (tree.children?.length) {
    let y = 0;
    for (const child of tree.children) {
      y = layoutSubtree(child, 1, y);
      y++;
    }
  }

  // ── FINAL COMPRESSION ──
  const all = [];
  function collect(node) {
    if (node.position) all.push(node);
    (node.children || []).forEach(collect);
  }
  collect(tree);
  const yList = [...new Set(all.map(n => n.position[1]))].sort((a, b) => a - b);
  const yMap = new Map(yList.map((y, i) => [y, i * dy]));
  all.forEach(n => {
    const [x, y] = n.position;
    n.position = [x, yMap.get(y)];
  });

  // ── ENFORCE NON-CROSSING ──
  const rangeMap = new Map();
  function getRange(n) {
    if (!n.children?.length) {
      const y = n.position[1] / dy;
      rangeMap.set(n.name, [y, y]);
      return [y, y];
    }
    const ranges = n.children.map(getRange);
    const selfY = n.position[1] / dy;
    const ymin = Math.min(selfY, ...ranges.map(r => r[0]));
    const ymax = Math.max(selfY, ...ranges.map(r => r[1]));
    rangeMap.set(n.name, [ymin, ymax]);
    return [ymin, ymax];
  }
  getRange(tree);

  function shift(node, delta) {
    if (node.position) node.position[1] += delta * dy;
    for (const c of node.children || []) shift(c, delta);
  }

  function applyOrder(node) {
    if (!node.children?.length) return;
    for (let i = 0; i < node.children.length; i++) {
      for (let j = 0; j < i; j++) {
        const A = node.children[i];
        const B = node.children[j];
        const [aMin, aMax] = rangeMap.get(A.name);
        const [bMin, bMax] = rangeMap.get(B.name);
        const ay = A.position[1] / dy;
        const by = B.position[1] / dy;
        if (ay < by && aMax >= bMin) {
          const delta = aMax - bMin + 1;
          shift(B, delta);
          getRange(tree); // refresh
        }
      }
    }
    for (const c of node.children) applyOrder(c);
  }

  applyOrder(tree);
  return tree;
}
