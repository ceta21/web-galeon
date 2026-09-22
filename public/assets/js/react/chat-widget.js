// chat-widget.js — Widget de chat con IA (asistente "Nova") para GABX LABS.
// Se monta sobre #chat-widget-root. React.createElement puro, sin build step.
// Habla con el backend en POST {endpoint} (app/Controllers/Assistant.php), que a su vez
// llama a OpenAI desde el servidor — la API key nunca se expone en este archivo ni en el navegador.
(function () {
    var h = React.createElement;
    var useState = React.useState;
    var useRef = React.useRef;
    var useEffect = React.useEffect;

    function getCsrf() {
        var nameMeta = document.querySelector('meta[name="csrf-token-name"]');
        var hashMeta = document.querySelector('meta[name="csrf-token-hash"]');
        return {
            name: nameMeta ? nameMeta.getAttribute('content') : null,
            hash: hashMeta ? hashMeta.getAttribute('content') : null,
        };
    }

    function TypingDots() {
        return h('div', { className: 'chat-widget__typing' },
            h('span', null), h('span', null), h('span', null)
        );
    }

    function ChatMessage(props) {
        var msg = props.message;
        var isUser = msg.role === 'user';
        return h('div', { className: 'chat-widget__row ' + (isUser ? 'chat-widget__row--user' : 'chat-widget__row--assistant') },
            h('div', { className: 'chat-widget__bubble ' + (isUser ? 'chat-widget__bubble--user' : 'chat-widget__bubble--assistant') },
                h('p', null, msg.text),
                msg.cta ? h('a', { href: msg.cta.href, className: 'btn btn--primary btn--sm chat-widget__cta' }, msg.cta.label) : null,
                msg.demo ? h('span', { className: 'chat-widget__demo-note' }, 'Respuesta de demostración — conecta tu clave de OpenAI para respuestas reales.') : null
            )
        );
    }

    function ChatWidget(props) {
        var stateOpen = useState(false);
        var isOpen = stateOpen[0], setIsOpen = stateOpen[1];

        var stateMessages = useState([
            {
                id: 'greeting',
                role: 'assistant',
                text: '¡Hola! Soy ' + props.assistantName + ', el asistente de ' + props.brandName + ' \uD83D\uDC4B ¿En qué proyecto de automatización o web estás pensando?',
            },
        ]);
        var messages = stateMessages[0], setMessages = stateMessages[1];

        var stateInput = useState('');
        var inputValue = stateInput[0], setInputValue = stateInput[1];

        var stateTyping = useState(false);
        var isTyping = stateTyping[0], setIsTyping = stateTyping[1];

        var listRef = useRef(null);

        useEffect(function () {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        }, [messages, isTyping]);

        var csrfRef = useRef(getCsrf());

        function pushMessage(msg) {
            setMessages(function (prev) { return prev.concat([msg]); });
        }

        function demoFallbackReply(userText) {
            return '¡Buena pregunta! Puedo ayudarte con automatización de tareas repetitivas o con una web nueva a medida. '
                + 'Cuéntanos los detalles en el formulario y te preparamos una propuesta concreta sin compromiso.';
        }

        function sendMessage(e) {
            if (e && e.preventDefault) e.preventDefault();
            var text = inputValue.trim();
            if (!text || isTyping) return;

            pushMessage({ id: 'u-' + Date.now(), role: 'user', text: text });
            setInputValue('');
            setIsTyping(true);

            var csrf = csrfRef.current;
            var body = 'message=' + encodeURIComponent(text);
            if (csrf.name && csrf.hash) {
                body += '&' + encodeURIComponent(csrf.name) + '=' + encodeURIComponent(csrf.hash);
            }

            fetch(props.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' },
                body: body,
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, status: res.status, data: data };
                    }).catch(function () {
                        return { ok: res.ok, status: res.status, data: null };
                    });
                })
                .then(function (result) {
                    setIsTyping(false);

                    // CodeIgniter rota el token CSRF en cada petición: lo actualizamos para la siguiente.
                    if (result.data && result.data.csrfName && result.data.csrfHash) {
                        csrfRef.current = { name: result.data.csrfName, hash: result.data.csrfHash };
                    }

                    if (result.ok && result.data && result.data.reply) {
                        pushMessage({ id: 'a-' + Date.now(), role: 'assistant', text: result.data.reply });
                        return;
                    }
                    // Algo ha fallado en el backend: lo mostramos en consola para poder diagnosticarlo,
                    // y mientras tanto no rompemos la experiencia con una respuesta de demostración.
                    console.error(
                        '[GABX chat] El asistente no respondió correctamente. HTTP ' + result.status + '. ' +
                        'Detalle del servidor: ' + (result.data && result.data.error ? result.data.error : '(sin detalle — revisa la pestaña Network)')
                    );
                    if (result.data && result.data.debug) {
                        console.error('[GABX chat] Detalle de depuración:', result.data.debug);
                    }
                    pushMessage({
                        id: 'a-' + Date.now(),
                        role: 'assistant',
                        text: demoFallbackReply(text),
                        cta: { label: 'Pedir presupuesto gratis →', href: '#contacto' },
                        demo: true,
                    });
                })
                .catch(function (err) {
                    // Fallo de red (o esta vista previa estática, que no tiene backend real).
                    console.error('[GABX chat] No se pudo contactar con ' + props.endpoint + ': ', err);
                    setIsTyping(false);
                    pushMessage({
                        id: 'a-' + Date.now(),
                        role: 'assistant',
                        text: demoFallbackReply(text),
                        cta: { label: 'Pedir presupuesto gratis →', href: '#contacto' },
                        demo: true,
                    });
                });
        }

        return h(React.Fragment, null,
            h('button', {
                type: 'button',
                className: 'chat-widget__toggle',
                'aria-label': isOpen ? 'Cerrar el asistente' : 'Abrir el asistente',
                onClick: function () { setIsOpen(!isOpen); },
            },
                isOpen
                    ? h('span', { className: 'chat-widget__toggle-icon' }, '\u00D7')
                    : h('img', { src: props.logoSrc, alt: '', className: 'chat-widget__toggle-logo' })
            ),

            isOpen && h('div', { className: 'chat-widget__panel', role: 'dialog', 'aria-label': 'Asistente de ' + props.brandName },
                h('header', { className: 'chat-widget__header' },
                    h('img', { src: props.logoSrc, alt: '', className: 'chat-widget__avatar' }),
                    h('div', { className: 'chat-widget__header-text' },
                        h('strong', null, props.assistantName + ' · Asistente de ' + props.brandName),
                        h('span', { className: 'chat-widget__status' }, h('i', null), ' En línea')
                    ),
                    h('button', { type: 'button', className: 'chat-widget__close', 'aria-label': 'Cerrar', onClick: function () { setIsOpen(false); } }, '\u00D7')
                ),

                h('div', { className: 'chat-widget__messages', ref: listRef },
                    messages.map(function (msg) { return h(ChatMessage, { message: msg, key: msg.id }); }),
                    isTyping && h('div', { className: 'chat-widget__row chat-widget__row--assistant' },
                        h('div', { className: 'chat-widget__bubble chat-widget__bubble--assistant' }, h(TypingDots))
                    )
                ),

                h('form', { className: 'chat-widget__form', onSubmit: sendMessage },
                    h('input', {
                        type: 'text',
                        className: 'chat-widget__input',
                        placeholder: 'Escribe tu mensaje...',
                        value: inputValue,
                        onChange: function (e) { setInputValue(e.target.value); },
                        'aria-label': 'Escribe tu mensaje',
                    }),
                    h('button', { type: 'submit', className: 'chat-widget__send', 'aria-label': 'Enviar' },
                        h('svg', { viewBox: '0 0 24 24', width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                            h('line', { x1: 22, y1: 2, x2: 11, y2: 13 }),
                            h('polygon', { points: '22 2 15 22 11 13 2 9 22 2' })
                        )
                    )
                ),

                h('p', { className: 'chat-widget__footnote' }, 'Respuestas generadas por IA')
            )
        );
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('chat-widget-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(ChatWidget, {
            endpoint: root.getAttribute('data-endpoint'),
            logoSrc: root.getAttribute('data-logo-src'),
            assistantName: root.getAttribute('data-assistant-name') || 'Nova',
            brandName: root.getAttribute('data-brand-name') || 'GABX LABS',
        }));
    });
})();
