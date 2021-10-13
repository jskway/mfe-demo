import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

// We don't need a mount function on our Container app because
// in all scenarios, we want the Container to show itself immediately