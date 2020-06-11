import React from 'react';
import Graph from 'react-graph-vis';

import './Embed.css';

export default function Embed({ location }) {
  const params = new URLSearchParams(location.search);
  const nodes = params.get('nodes');
  const edges = params.get('edges');
  const directed = params.get('directed');
  const disableInteraction = params.get('disable_interaction');

  const options = {
    autoResize: true,
    layout: {
      hierarchical: false
    },
    nodes: {
      color: '#fff'
    },
    edges: {
      color: '#000',
      arrows: {
        to: {
          enabled: !!(directed && directed === 'true')
        }
      }
    },
    interaction: {
      dragNodes: !(disableInteraction && disableInteraction === 'true'),
      dragView: !(disableInteraction && disableInteraction === 'true')
    }
  };

  let graph = null;
  let error = null;

  try {
    if (!nodes || !edges) {
      throw new Error('The "nodes" or the "edges" parameter is missing.');
    }

    graph = {
      nodes: nodes.split(',').map(n => {
        return {
          id: parseInt(n),
          label: n
        };
      }),

      edges: edges.split(',').map(e => {
        const components = e.split('-');
        if (components.length !== 2) {
          return null;
        }

        return {
          from: components[0],
          to: components[1]
        };
      }).filter(e => e !== null)
    }
  } catch (err) {
    error = err.message;
  }

  return (
    <div>
      {error && error.length && (
        <div className="error">{error}</div>
      )}

      {graph && (
        <div className="full-width-graph">
          <Graph
            graph={graph}
            options={options}
          />
        </div>
      )}
    </div>
  );
}
