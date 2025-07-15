import React from 'react';
import HorizontalTree from './HorizontalTree';
import {  layoutTree } from './layout';

const inputTree = {
  name: "root",
  children: [
    {
      name: "A",
      children: [
        {
          name: "B",
          children: [
            { name: "C" },
            { name: "E" },
            { name: "F" }
          ]
        }
      ]
    },
    {
      name: "D",
      children: [
        {
          name: "G",
          children: [
            { name: "H" },
            { name: "I" }
          ]
        }
      ]
    }
  ]
};


const testTree = {
  name: "root",
  children: [
    {
      name: "A",
      children: [
        {
          name: "B",
          children: [
            { name: "C" },
            { name: "D" },
            {
              name: "E",
              children: [
                { name: "F" },
                { name: "G" },
                {
                  name: "H",
                  children: [
                    { name: "I" },
                    { name: "J" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "K",
      children: [
        {
          name: "L",
          children: [
            { name: "M" },
            { name: "N" }
          ]
        },
        {
          name: "O",
          children: [
            {
              name: "P",
              children: [
                { name: "Q" },
                {
                  name: "R",
                  children: [
                    { name: "S" },
                    { name: "T" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const tree2 = {
  "name": "root",
  "children": [
    {
      "name": "A",
      "children": [
        {
          "name": "B",
          "children": [
            { "name": "C" },
            { "name": "D" },
            {
              "name": "E",
              "children": [
                { "name": "F" },
                { "name": "G" },
                {
                  "name": "H",
                  "children": [
                    { "name": "I" },
                    { "name": "J" },
                    { "name": "K" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "L",
      "children": [
        {
          "name": "M",
          "children": [
            { "name": "N" },
            { "name": "O" }
          ]
        },
        {
          "name": "P",
          "children": [
            {
              "name": "Q",
              "children": [
                { "name": "R" },
                {
                  "name": "S",
                  "children": [
                    { "name": "T" },
                    { "name": "U" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const tree3 = {
  "name": "root",
  "children": [
    {
      "name": "A",
      "children": [
        {
          "name": "B",
          "children": [
            {
              "name": "C",
              "children": [
                { "name": "D" },
                {
                  "name": "E",
                  "children": [
                    {
                      "name": "F",
                      "children": [
                        { "name": "G" },
                        { "name": "H" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "I",
      "children": [
        {
          "name": "J",
          "children": [
            {
              "name": "K",
              "children": [
                { "name": "L" },
                {
                  "name": "M",
                  "children": [
                    { "name": "N" },
                    { "name": "O" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const tree4 = {
  "name": "root",
  "children": [
    {
      "name": "A",
      "children": [
        {
          "name": "A1",
          "children": [
            {
              "name": "A1a",
              "children": [
                {
                  "name": "A1a1",
                  "children": [
                    { "name": "A1a1i" },
                    { "name": "A1a1ii" },
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "B",
      "children": [
        {
          "name": "B1",
          "children": [
            {
              "name": "B1a",
              "children": [
                { "name": "B1a1" },
                {
                  "name": "B1a2",
                  "children": [
                    { "name": "B1a2i" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "C",
      "children": [
        {
          "name": "C1",
          "children": [
            {
              "name": "C1a",
              "children": [
                { "name": "C1a1" },
                { "name": "C1a2" }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "D",
      "children": [
        {
          "name": "D1",
          "children": [
            { "name": "D1a" }
          ]
        }
      ]
    },
    {
      "name": "E",
      "children": [
        {
          "name": "E1",
          "children": [
            {
              "name": "E1a",
              "children": [
                {
                  "name": "E1a1",
                  "children": [
                    { "name": "E1a1i" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "F",
      "children": [
        {
          "name": "F1",
          "children": [
            {
              "name": "F1a",
              "children": [
                {
                  "name": "F1a1",
                  "children": [
                    {
                      "name": "F1a1i",
                      "children": [
                        { "name": "F1a1i1" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


function App() {

  
  const result = layoutTree(testTree, 120, 60);

//   function findY(name, node) {
//     if (!node.position) {
//       debugger;
//     }
//     if (!node) return undefined;
//     if (node.name === name) return node.position?.[1] / 60;
//     for (const c of node.children || []) {
//       const y = findY(name, c);
//       if (y !== undefined) return y;
//     }
//   }

// ["K","L","M","G"].forEach(name => {
//   const y = findY(name, result);
//   if (y === undefined) console.error(`${name} ❌ MISSING`);
//   else console.log(`${name} ✅ y=${y}`);
// });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Horizontal Tree Layout</h2>
      <HorizontalTree data={result} />
    </div>
  );
}

export default App;
