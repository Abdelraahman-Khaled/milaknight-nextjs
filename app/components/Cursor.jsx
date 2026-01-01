"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const textRef = useRef(null);
    const [stick, setStick] = useState(null);
    const [visible, setVisible] = useState(true);
    const pos = useRef({ x: 0, y: 0 });
    const visibleTimeoutRef = useRef(null);

    // Default configuration matching the snippet
    const options = {
        speed: 0.7,
        ease: "expo.out",
        visibleTimeout: 300
    };

    useEffect(() => {
        // Move function wrapped in component logic
        const move = (x, y, duration) => {
            gsap.to(cursorRef.current, {
                x: x !== undefined ? x : pos.current.x,
                y: y !== undefined ? y : pos.current.y,
                force3D: true,
                overwrite: true,
                ease: options.ease,
                duration: visible ? (duration !== undefined ? duration : options.speed) : 0
            });
        };

        const updateCursor = () => {
            // Logic to calculate position based on "stick" or mouse
            move();
            show();
        };

        const show = () => {
            if (visibleTimeoutRef.current) {
                clearTimeout(visibleTimeoutRef.current);
                visibleTimeoutRef.current = null;
            }
            if (cursorRef.current) {
                cursorRef.current.classList.add('-visible');
            }
        };

        const hide = () => {
            if (visibleTimeoutRef.current) {
                clearTimeout(visibleTimeoutRef.current);
            }
            if (cursorRef.current) {
                cursorRef.current.classList.remove('-visible');
            }
        };

        const onMouseMove = (e) => {
            // If sticking, calculate sticky position logic (magnet effect)
            // Original snippet: this.stick ? this.stick.x - ((this.stick.x - e.clientX) * 0.15) : e.clientX
            // We need a stable reference to `stick` state or ref.
            // Since event listener binding often captures stale state, let's use a ref for 'stick' if complex
            // But simple approach: use the 'pos' ref to store latest target X/Y.

            // Actually, we can just update pos.current here.
            // But we need access to the current "stick" value. 
            // We can check if we are in a stuck state via a ref.
        };

        // Simpler implementation converting strict jQuery class:
        // We will standard mouse tracking first.

        const handleMouseMove = (e) => {
            // For simplicity in this port, we will just track directly first, then refine sticky
            // Re-implementing the exact logic:
            /*
               this.pos = {
                   x: this.stick ? this.stick.x - ((this.stick.x - e.clientX) * 0.15) : e.clientX,
                   y: this.stick ? this.stick.y - ((this.stick.y - e.clientY) * 0.15) : e.clientY
               };
               this.update();
            */
            // Access sticky state from a ref to avoid re-binding
        };

        // We'll implementation full logic in a minute.
        // Let's create the element refs first.
    }, []);

    // Rerendering full Component with logic inside useEffect to avoid closures
    useEffect(() => {
        const cursor = cursorRef.current;
        const text = textRef.current;

        let stickData = null; // internal stick state
        let isVisible = false; // internal opacity state
        let visibleInt = null;

        const mouse = { x: 0, y: 0 }; // caching mouse for sticky calc

        const move = (x, y, duration) => {
            gsap.to(cursor, {
                x: x || mouse.current_x,
                y: y || mouse.current_y,
                force3D: true,
                overwrite: true,
                ease: options.ease,
                duration: isVisible ? (duration || options.speed) : 0
            });
        };

        const show = () => {
            if (visibleInt) clearTimeout(visibleInt);
            cursor.classList.add('-visible');
            isVisible = true;
        };

        const hide = () => {
            if (visibleInt) clearTimeout(visibleInt);
            cursor.classList.remove('-visible');
            visibleInt = setTimeout(() => { isVisible = false; }, options.visibleTimeout);
        };

        const setState = (state) => cursor.classList.add(state);
        const removeState = (state) => cursor.classList.remove(state);
        const setText = (txt) => {
            text.innerHTML = txt;
            cursor.classList.add('-text');
        };
        const removeText = () => cursor.classList.remove('-text');

        const setStick = (el) => {
            const bound = el.getBoundingClientRect();
            stickData = {
                y: bound.top + (bound.height / 2),
                x: bound.left + (bound.width / 2)
            };
            move(stickData.x, stickData.y, 5);
        };
        const removeStick = () => { stickData = null; };

        // Mouse Move
        const onMouseMove = (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            // Update logic based on stick
            const targetX = stickData ? stickData.x - ((stickData.x - clientX) * 0.15) : clientX;
            const targetY = stickData ? stickData.y - ((stickData.y - clientY) * 0.15) : clientY;

            mouse.current_x = targetX;
            mouse.current_y = targetY;

            move(targetX, targetY);
            show();
        };

        // Bindings
        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', hide);
        document.body.addEventListener('mouseenter', show);
        document.body.addEventListener('mousedown', () => setState('-active'));
        document.body.addEventListener('mouseup', () => removeState('-active'));

        // Delegation for hoverable elements
        const handleMouseEnter = (e) => {
            const target = e.target;
            if (target.matches('a, input, textarea, button, .hoverable')) {
                setState('-pointer');
            }
            if (target.matches('iframe')) hide();
            if (target.matches('[data-cursor]')) setState(target.dataset.cursor);
            if (target.matches('[data-cursor-text]')) setText(target.dataset.cursorText);
            if (target.matches('[data-cursor-stick]')) setStick(target);
        };

        const handleMouseLeave = (e) => {
            const target = e.target;
            if (target.matches('a, input, textarea, button, .hoverable')) {
                removeState('-pointer');
            }
            if (target.matches('iframe')) show();
            if (target.matches('[data-cursor]')) removeState(target.dataset.cursor);
            if (target.matches('[data-cursor-text]')) removeText();
            if (target.matches('[data-cursor-stick]')) removeStick();
        };

        // We use capture or just bubble? 'mouseenter' doesn't bubble. 
        // We typically need 'mouseover' for delegation.
        // Re-implementing with mouseover/mouseout for delegation
        const onMouseOver = (e) => {
            const target = e.target.closest('a, input, textarea, button, .hoverable, [data-cursor], [data-cursor-text], [data-cursor-stick]');
            if (!target) return;

            if (target.matches('a, input, textarea, button, .hoverable')) setState('-pointer');
            if (target.dataset.cursor) setState(target.dataset.cursor);
            if (target.dataset.cursorText) setText(target.dataset.cursorText);
            if (target.dataset.cursorStick) setStick(target);
        };

        const onMouseOut = (e) => {
            const target = e.target.closest('a, input, textarea, button, .hoverable, [data-cursor], [data-cursor-text], [data-cursor-stick]');
            if (!target) return;

            if (target.matches('a, input, textarea, button, .hoverable')) removeState('-pointer');
            if (target.dataset.cursor) removeState(target.dataset.cursor);
            if (target.dataset.cursorText) removeText();
            if (target.dataset.cursorStick) removeStick();
        };

        // Note: Using mouseover/out for delegation works but can be noisy. 
        // The original used direct binding `this.body.on('mouseenter', 'selector', ...)` logic which jQuery handles.
        // In vanilla, delegating mouseover is the standard way. 
        // We will check `.closest` to support nested elements triggering the parent's cursor effect.
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);


        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', hide);
            document.body.removeEventListener('mouseenter', show);
            // Remove other listeners...
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    return (
        <div ref={cursorRef} className="cb-cursor">
            <div ref={textRef} className="cb-cursor-text"></div>
        </div>
    );
};

export default Cursor;
