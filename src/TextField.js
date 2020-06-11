import React, { useState } from 'react';
import {
  parseAdjacencyMatrix,
  parseAdjacencyList,
  parseNodeList,
  parseParentList
} from "./lib/parseGraph";

export default function TextField({ type, updateGraph }) {
  let label;
  let example;
  let parse;

  const [error, setError] = useState(null);

  switch (type) {
    case 'am':
      label = 'From adjacency matrix:';
      example = [ '0 1 1 1 0', '1 0 0 1 1', '1 0 0 1 0', '1 1 1 1 1', '0 1 0 1 0' ].join('\n');
      parse = parseAdjacencyMatrix;
      break;
    case 'al':
      label = 'From adjacency list:';
      example = [ '2 3 4', '1 4 5', '1 4', '1 2 3 4 5', '2 4' ].join('\n');
      parse = parseAdjacencyList;
      break;
    case 'nl':
      label = 'From node list:';
      example = [ '1 2', '1 3', '1 4', '2 4', '2 5', '3 4', '4 4', '4 5' ].join('\n');
      parse = parseNodeList;
      break;
    case 'pl':
      label = 'From parent list (for tree structures):';
      example = '3 3 4 0 6 2';
      parse = parseParentList;
      break;
    default:
      break;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const graph = parse(e.target.data.value);
      updateGraph(graph);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <label>{label}</label>
      {error && <div className="error">{error}</div>}
      <textarea name="data" placeholder={example}></textarea>
      <button type="submit">Generate</button>
    </form>
  );
}
