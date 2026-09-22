// hero-rotator.js — Frase rotativa bajo el H1 del hero ("Ahora mismo podemos automatizar: ...").
// Se monta sobre #hero-rotator-root. Cambia de palabra cada ~2.4s con una transición de fundido.
(function () {
    var h = React.createElement;
    var useState = React.useState;
    var useEffect = React.useEffect;

    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function HeroRotator(props) {
        var words = props.words || [];
        var stateIndex = useState(0);
        var index = stateIndex[0], setIndex = stateIndex[1];

        useEffect(function () {
            if (prefersReducedMotion || words.length < 2) return;
            var id = setInterval(function () {
                setIndex(function (i) { return (i + 1) % words.length; });
            }, 2400);
            return function () { clearInterval(id); };
        }, [words.length]);

        if (!words.length) return null;

        return h('p', { className: 'hero-rotator' },
            props.prefix,
            h('span', { className: 'hero-rotator__word', key: index }, words[index])
        );
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('hero-rotator-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var words = [];
        try {
            words = JSON.parse(root.getAttribute('data-words') || '[]');
        } catch (e) {
            words = [];
        }
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(HeroRotator, { words: words, prefix: root.getAttribute('data-prefix') || '' }));
    });
})();
