import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        // ref.current is the reference to the HTML element we want to mount MarketingApp to
        mount(ref.current);
    });

    return <div ref={ref} />
};