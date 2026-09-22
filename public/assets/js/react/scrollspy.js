// scrollspy.js — Resalta en el menú el enlace de la sección visible mientras se hace scroll.
// No renderiza nada propio: usa React solo para gestionar el efecto sobre los enlaces reales del navbar.
(function () {
    var h = React.createElement;
    var useEffect = React.useEffect;

    function ScrollSpy() {
        useEffect(function () {
            var links = Array.prototype.slice.call(document.querySelectorAll('.navbar__links a[href*="#"]:not(.btn)'));
            if (!links.length) return;

            var sectionMap = links.map(function (link) {
                var hash = link.getAttribute('href').split('#')[1];
                var section = hash ? document.getElementById(hash) : null;
                return { link: link, section: section };
            }).filter(function (entry) { return entry.section; });

            if (!sectionMap.length) return;

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var match = sectionMap.find(function (e) { return e.section === entry.target; });
                    if (!match) return;
                    if (entry.isIntersecting) {
                        sectionMap.forEach(function (e) { e.link.classList.remove('is-active'); });
                        match.link.classList.add('is-active');
                    }
                });
            }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

            sectionMap.forEach(function (e) { observer.observe(e.section); });

            return function () { observer.disconnect(); };
        }, []);

        return null;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('scrollspy-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(ScrollSpy));
    });
})();
