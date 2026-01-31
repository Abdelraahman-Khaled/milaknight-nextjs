"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { usePathname } from 'next/navigation';

const Cursor = () => {
    const cursorRef = useRef(null);
    const textRef = useRef(null);
    const pathname = usePathname();
    const [visible, setVisible] = useState(true);
    const pos = useRef({ x: 0, y: 0 });
    const visibleTimeoutRef = useRef(null);

    // Default configuration matching the snippet
    const options = {
        speed: 0.7,
        ease: "expo.out",
        visibleTimeout: 300
    };

    // Rerendering full Component with logic inside useEffect to avoid closures
    useEffect(() => {
        const cursor = cursorRef.current;
        const text = textRef.current;
        if (!cursor || !text) return;

        let stickData = null;
        let isVisible = false;
        let visibleInt = null;

        const mouse = { x: 0, y: 0 };

        const move = (x, y, duration) => {
            gsap.to(cursor, {
                x: x ?? mouse.x,
                y: y ?? mouse.y,
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

        // Reset cursor on route change
        removeText();
        // Remove common cursor classes
        const statesToRemove = ['-pointer', '-active', '-text'];
        statesToRemove.forEach(s => removeState(s));

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

            mouse.x = stickData ? stickData.x - ((stickData.x - clientX) * 0.15) : clientX;
            mouse.y = stickData ? stickData.y - ((stickData.y - clientY) * 0.15) : clientY;

            move(mouse.x, mouse.y);
            show();
        };

        // Bindings
        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', hide);
        document.body.addEventListener('mouseenter', show);
        document.body.addEventListener('mousedown', () => setState('-active'));
        document.body.addEventListener('mouseup', () => removeState('-active'));

        const onMouseOver = (e) => {
            const target = e.target.closest('a, input, textarea, button, .hoverable, [data-cursor], [data-cursor-text], [data-cursor-stick], [data-cursor-hidden]');
            if (!target) return;

            if (target.matches('a, input, textarea, button, .hoverable')) setState('-pointer');
            if (target.dataset.cursor) setState(target.dataset.cursor);
            if (target.dataset.cursorText) setText(target.dataset.cursorText);
            if (target.dataset.cursorStick) setStick(target);
            if (target.hasAttribute('data-cursor-hidden')) setState('-hidden');
        };

        const onMouseOut = (e) => {
            const target = e.target.closest('a, input, textarea, button, .hoverable, [data-cursor], [data-cursor-text], [data-cursor-stick], [data-cursor-hidden]');
            if (!target) return;

            if (target.matches('a, input, textarea, button, .hoverable')) removeState('-pointer');
            if (target.dataset.cursor) removeState(target.dataset.cursor);
            if (target.dataset.cursorText) removeText();
            if (target.dataset.cursorStick) removeStick();
            if (target.hasAttribute('data-cursor-hidden')) removeState('-hidden');
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', hide);
            document.body.removeEventListener('mouseenter', show);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, [pathname]);

    return (
        <div ref={cursorRef} className="cb-cursor">
            <div ref={textRef} className="cb-cursor-text"></div>
        </div>
    );
};

export default Cursor;
