import React, { useState } from 'react';
import Graph from 'react-graph-vis';

import './App.css';
import TextField from './TextField';
import TheFooter from './TheFooter';

function App() {
  const defaultGraph = {
    nodes: [],
    edges: []
  };

  const [network, setNetwork] = useState();

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
  }

  function toggleMode() {
    options.edges.arrows.to.enabled = !options.edges.arrows.to.enabled;
    network.setOptions(options);
  }

  return (
    <div className="app">
      <div className="wrapper">
        <h1>Graphgen</h1>
        <div className="content">
          <section className="options">
            <div className="input-field checkbox">
              <input type="checkbox" onClick={toggleMode} name="directed" id="directed" />
              <label for="directed">Directed graph</label>
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
          </section>
        </div>
      </div>

      <TheFooter />
    </div>
  );
}

export default App;
