// hero-particles.js — Fondo de partículas conectadas (canvas) para el hero.
// Se monta sobre #hero-particles-root. Efecto sutil: pocas partículas, movimiento lento,
// líneas entre partículas cercanas. Se desactiva (frame estático) si prefers-reduced-motion.
(function () {
    var h = React.createElement;
    var useRef = React.useRef;
    var useEffect = React.useEffect;

    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ParticleField() {
        var canvasRef = useRef(null);

        useEffect(function () {
            var canvas = canvasRef.current;
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            var parent = canvas.parentElement;
            var particles = [];
            var raf = null;
            var count = 34;

            function resize() {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }

            function init() {
                resize();
                particles = [];
                for (var i = 0; i < count; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.25,
                        vy: (Math.random() - 0.5) * 0.25,
                    });
                }
            }

            function drawFrame() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(124, 196, 255, 0.55)';
                    ctx.fill();
                }
                for (var i = 0; i < particles.length; i++) {
                    for (var j = i + 1; j < particles.length; j++) {
                        var a = particles[i], b = particles[j];
                        var dx = a.x - b.x, dy = a.y - b.y;
                        var dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120) {
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.strokeStyle = 'rgba(47, 140, 255, ' + (0.16 * (1 - dist / 120)) + ')';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
            }

            function tick() {
                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                }
                drawFrame();
                raf = requestAnimationFrame(tick);
            }

            init();
            if (prefersReducedMotion) {
                drawFrame();
            } else {
                tick();
            }

            function handleResize() { resize(); }
            window.addEventListener('resize', handleResize);

            return function () {
                window.removeEventListener('resize', handleResize);
                if (raf) cancelAnimationFrame(raf);
            };
        }, []);

        return h('canvas', { ref: canvasRef, className: 'hero-particles__canvas', 'aria-hidden': 'true' });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('hero-particles-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(ParticleField));
    });
})();
