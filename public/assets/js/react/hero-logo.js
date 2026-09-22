// hero-logo.js — Componente React: logo del hero con flotación continua + tilt por movimiento del ratón.
// Se monta sobre #hero-logo-root. No usa JSX/Babel (React.createElement puro) para no requerir build step.
(function () {
    var h = React.createElement;
    var useRef = React.useRef;

    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function FloatingLogo(props) {
        var wrapRef = useRef(null);
        var innerRef = useRef(null);

        function handleMouseMove(e) {
            if (prefersReducedMotion) return;
            var el = wrapRef.current;
            var inner = innerRef.current;
            if (!el || !inner) return;
            var rect = el.getBoundingClientRect();
            var relX = (e.clientX - rect.left) / rect.width;
            var relY = (e.clientY - rect.top) / rect.height;
            var tiltX = (relY - 0.5) * -14;
            var tiltY = (relX - 0.5) * 14;
            inner.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
        }

        function handleMouseLeave() {
            var inner = innerRef.current;
            if (inner) inner.style.transform = '';
        }

        return h('div', {
            ref: wrapRef,
            className: 'hero__logo-interactive',
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave
        },
            h('div', { className: 'hero__logo-float' },
                h('div', { ref: innerRef, className: 'hero__logo-tilt' },
                    h('img', { src: props.src, alt: '', className: 'hero__logo-mark' })
                )
            )
        );
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('hero-logo-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var src = root.getAttribute('data-logo-src');
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(FloatingLogo, { src: src }));
    });
})();
