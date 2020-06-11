import React, { useState } from 'react';
import Graph from 'react-graph-vis';

import './Home.css';
import TextField from './TextField';
import TheFooter from './TheFooter';

function App() {
  const defaultGraph = {
    nodes: [],
    edges: []
  };

  const [graph, setGraph] = useState(defaultGraph);
  const [network, setNetwork] = useState();
  const [embed, setEmbed] = useState('');
  const [embedDisableInteraction, setEmbedDisableInteraction] = useState(false);

  const options = {
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
          enabled: false
        }
      }
    }
  };

  function updateGraph(newGraph) {
    network.setData(newGraph);
    setGraph(newGraph);
  }

  function toggleMode() {
    options.edges.arrows.to.enabled = !options.edges.arrows.to.enabled;
    network.setOptions(options);
  }

  function toggleEmbedInteraction() {
    setEmbedDisableInteraction(!embedDisableInteraction);
  }

  function generateEmbedLink() {
    const { edges, nodes } = graph;
    const params = new URLSearchParams();
    params.set('nodes', nodes.map(n => n.label).join(','));
    params.set('edges', edges.map(e => `${e.from}-${e.to}`).join(','));

    if (options.edges.arrows.to.enabled) {
      params.set('directed', true);
    }

    if (embedDisableInteraction) {
      params.set('disable_interaction', true);
    }

    const url = `${window.location.protocol}//${window.location.host}/embed?${params.toString()}`;
    setEmbed(url);
  }

  return (
    <div className="app">
      <div className="wrapper">
        <h1>Graphgen</h1>
        <div className="content">
          <section className="options">
            <div className="input-field checkbox">
              <input type="checkbox" onClick={toggleMode} name="directed" id="directed" />
              <label htmlFor="directed">Directed graph</label>
            </div>
            <TextField type="nl" updateGraph={updateGraph} />
            <TextField type="al" updateGraph={updateGraph} />
            <TextField type="am" updateGraph={updateGraph} />
            <TextField type="pl" updateGraph={updateGraph} />
          </section>
          <section className="graph">
            <Graph
              graph={defaultGraph}
              options={options}
              getNetwork={setNetwork}
            />

            <div className="embed-generator">
              <button onClick={generateEmbedLink}>Generate Embed Link</button>

              <div className="input-field checkbox">
                <input
                  type="checkbox"
                  onClick={toggleEmbedInteraction}
                  name="embedinteraction"
                  id="embedinteraction"
                />
                <label htmlFor="embedinteraction">Disable interaction in embed</label>
              </div>

              {embed && embed.length && (
                <textarea value={embed}></textarea>
              )}
            </div>
          </section>
        </div>
      </div>

      <TheFooter />
    </div>
  );
}

export default App;
