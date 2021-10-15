import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    // this is a copy of the Browser History used by Container
    const history = useHistory();

    useEffect(() => {
        // ref.current is the reference to the HTML element we want to mount MarketingApp to
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                // Check to prevent infinite loop
                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
};