function parseAdjacencyMatrix(data) {
  const matrix = data
    .split('\n')
    .filter(row => !!row.trim().length)
    .map(row => row.split(/\s/g));

  const graph = {
    nodes: [],
    edges: []
  };

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].length !== matrix.length) {
      throw new Error('Invalid adjacency matrix.');
    }

    graph.nodes.push({ id: i + 1, label: (i + 1).toString() });

    for (let j = 0; j < matrix[i].length; j++) {
      const isNode = !!parseInt(matrix[i][j]);
      isNode && graph.edges.push({ from: i + 1, to: j + 1 });
    }
  }

  return graph;
}

function convertToAdjacencyMatrix(graph) {
  const matrix = new Array(graph.nodes.length)
    .fill(0).map(() => new Array(graph.nodes.length).fill(0));

  graph.edges.forEach(edge => {
    matrix[edge.from - 1][edge.to - 1] = 1;
  });

  return matrix;
}

function parseAdjacencyList(data) {
  const nodes = Array.from(
    new Set(
      data
        .split(/\s/sg)
        .filter(n => parseInt(n.trim()).toString() === n)
    )
  ).map(node => {
    return {
      id: parseInt(node) + 1,
      label: node
    };
  });

  const graph = {
    nodes,
    edges: []
  };

  data
    .split('\n')
    .filter(l => l.trim())
    .forEach(line => {
      const current = line
        .split(/\s/g)
        .map(n => parseInt(n))
        .filter(n => !!n || n === 0);

      const from = current[0] + 1;

      const items = current.slice(1).map(edge => {
        return {
          from,
          to: edge + 1
        };
      });

      items && items.length && graph.edges.push(...items);
    });

  return graph;
}

function convertToAdjacencyList(graph) {
  const list = new Array(graph.nodes.length).fill([]);

  graph.edges.forEach(edge => {
    const from = edge.from - 1;

    if (list[edge.from]) {
      list[from].push(edge.to - 1);
    } else {
      list[from] = [ edge.to - 1 ];
    }
  });

  return list;
}

function parseParentList(data) {
  data = data
    .split('\n')[0]
    .split(/\s/g)
    .map(n => parseInt(n))
    .filter(n => !!n || n === 0);

  const graph = {
    nodes: [],
    edges: []
  };

  data.forEach((from, to) => {
    graph.nodes.push({
      id: to + 1,
      label: (to + 1).toString()
    });

    if (from) {
      if (from > data.length) {
        throw new Error('Invalid parent list.');
      }

      graph.edges.push({ from, to: to + 1 });
    }
  });

  return graph;
}

function convertToParentList(graph) {
  const max = Math.max(...graph.nodes.map(n => n.id));
  const list = new Array(max).fill(0);

  graph.edges.forEach(edge => {
    list[edge.to - 1] = edge.from;
  });

  return list;
}

function parseNodeList(data) {
  const graph = {
    nodes: [],
    edges: []
  };

  data
    .split('\n')
    .forEach(line => {
      line = line.split(/\s/g);

      const first = parseInt(line[0]);
      const second = parseInt(line[1]);

      if (first) {
        !graph.nodes.find(a => a.id === first) && graph.nodes.push({
          id: first,
          label: line[0]
        });

        if (second) {
          !graph.nodes.find(a => a.id === second) && graph.nodes.push({
            id: second,
            label: line[1]
          });

          graph.edges.push({
            from: first,
            to: second
          });
        }
      }
    });

  return graph;
}

function convertToNodeList(graph) {
  return graph.edges.map(edge => [ edge.from, edge.to ]);
}

export {
  parseAdjacencyMatrix,
  convertToAdjacencyMatrix,
  parseAdjacencyList,
  convertToAdjacencyList,
  parseParentList,
  convertToParentList,
  parseNodeList,
  convertToNodeList
};
