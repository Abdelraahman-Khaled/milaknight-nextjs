"use client";
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const Cursor = () => {
    const cursorRef = useRef(null);
    const textRef = useRef(null);
    const pathname = usePathname();
    const pos = useRef({ x: -100, y: -100 });
    const animFrameRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const text = textRef.current;
        if (!cursor || !text) return;

        let target = { x: -100, y: -100 };
        let current = { x: -100, y: -100 };
        let isVisible = false;
        let visibleTimeout = null;

        // Smooth follow loop using requestAnimationFrame (no GSAP needed)
        const lerp = (a, b, t) => a + (b - a) * t;

        const loop = () => {
            current.x = lerp(current.x, target.x, 0.15);
            current.y = lerp(current.y, target.y, 0.15);
            cursor.style.transform = `translate(${current.x}px, ${current.y}px)`;
            animFrameRef.current = requestAnimationFrame(loop);
        };
        animFrameRef.current = requestAnimationFrame(loop);

        const show = () => {
            if (visibleTimeout) clearTimeout(visibleTimeout);
            cursor.classList.add('-visible');
            isVisible = true;
        };

        const hide = () => {
            if (visibleTimeout) clearTimeout(visibleTimeout);
            cursor.classList.remove('-visible');
            visibleTimeout = setTimeout(() => { isVisible = false; }, 300);
        };

        const setState = (state) => cursor.classList.add(state);
        const removeState = (state) => cursor.classList.remove(state);
        const setText = (txt) => { text.innerHTML = txt; cursor.classList.add('-text'); };
        const removeText = () => cursor.classList.remove('-text');

        // Reset on route change
        removeText();
        ['-pointer', '-active', '-text'].forEach(s => removeState(s));

        const onMouseMove = (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
            show();
        };

        const onMouseOver = (e) => {
            const t = e.target.closest('a, input, textarea, button, .hoverable, [data-cursor], [data-cursor-text], [data-cursor-hidden]');
            if (!t) return;
            if (t.matches('a, input, textarea, button, .hoverable')) setState('-pointer');
            if (t.dataset.cursor) setState(t.dataset.cursor);
            if (t.dataset.cursorText) setText(t.dataset.cursorText);
            if (t.hasAttribute('data-cursor-hidden')) setState('-hidden');
        };

        const onMouseOut = (e) => {
            const t = e.target.closest('a, input, textarea, button, .hoverable, [data-cursor], [data-cursor-text], [data-cursor-hidden]');
            if (!t) return;
            if (t.matches('a, input, textarea, button, .hoverable')) removeState('-pointer');
            if (t.dataset.cursor) removeState(t.dataset.cursor);
            if (t.dataset.cursorText) removeText();
            if (t.hasAttribute('data-cursor-hidden')) removeState('-hidden');
        };

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', hide);
        document.body.addEventListener('mouseenter', show);
        document.body.addEventListener('mousedown', () => setState('-active'));
        document.body.addEventListener('mouseup', () => removeState('-active'));
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
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
