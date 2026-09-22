// feature-cards.js — Componente React: tarjetas de servicios con animación de entrada
// escalonada al hacer scroll y efecto "spotlight" + tilt 3D al pasar el ratón.
// Se monta sobre #feature-cards-root. React.createElement puro, sin build step.
(function () {
    var h = React.createElement;
    var useState = React.useState;
    var useRef = React.useRef;
    var useEffect = React.useEffect;

    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function FeatureCard(props) {
        var cardRef = useRef(null);
        var stateVisible = useState(false);
        var visible = stateVisible[0];
        var setVisible = stateVisible[1];

        useEffect(function () {
            var el = cardRef.current;
            if (!el || prefersReducedMotion) {
                setVisible(true);
                return;
            }
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () { setVisible(true); }, props.index * 90);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(el);
            return function () { observer.disconnect(); };
        }, []);

        function handleMouseMove(e) {
            if (prefersReducedMotion) return;
            var el = cardRef.current;
            if (!el) return;
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var tiltX = ((y / rect.height) - 0.5) * -8;
            var tiltY = ((x / rect.width) - 0.5) * 8;
            el.style.setProperty('--mx', x + 'px');
            el.style.setProperty('--my', y + 'px');
            el.style.transform = 'perspective(700px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-4px)';
        }

        function handleMouseLeave() {
            var el = cardRef.current;
            if (el) el.style.transform = '';
        }

        return h('article', {
            ref: cardRef,
            className: 'feature-card feature-card--react' + (visible ? ' is-visible' : ''),
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave
        },
            h('h3', { className: 'feature-card__title' }, props.feature.title),
            h('p', { className: 'feature-card__description' }, props.feature.description)
        );
    }

    function FeatureCards(props) {
        return h(React.Fragment, null,
            props.features.map(function (feature, i) {
                return h(FeatureCard, { feature: feature, index: i, key: i });
            })
        );
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('feature-cards-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var features = [];
        try {
            features = JSON.parse(root.getAttribute('data-features') || '[]');
        } catch (e) {
            features = [];
        }
        if (!features.length) return;
        root.innerHTML = '';
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(FeatureCards, { features: features }));
    });
})();
