import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App'

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    // If we were provided a defaultHistory (dev env) use it, otherwise use memory history in prod
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        // .listen is a event listener tied to history
        // whenever a nav event occurs, this will call any function that we passed in
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} />,
        el
    );

    // Functions that Container can call to update/change Marketing
    return {
        // { pathname } is passed in by history.listen()
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;

            // Check to prevent infinite loop
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
}

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through container
// and we should export the mount function
export { mount };