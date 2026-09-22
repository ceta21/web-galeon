// faq-accordion.js — Acordeón de FAQ animado (sustituye a los <details> nativos).
// Se monta sobre #faq-accordion-root. Solo un elemento abierto a la vez, con transición de altura.
(function () {
    var h = React.createElement;
    var useState = React.useState;
    var useRef = React.useRef;

    function FaqItem(props) {
        var isOpen = props.isOpen;
        var contentRef = useRef(null);
        var maxHeight = isOpen && contentRef.current ? contentRef.current.scrollHeight + 'px' : '0px';

        return h('div', { className: 'faq-item faq-item--react' + (isOpen ? ' is-open' : '') },
            h('button', {
                type: 'button',
                className: 'faq-item__question',
                'aria-expanded': isOpen,
                onClick: props.onToggle,
            },
                props.question,
                h('span', { className: 'faq-item__icon', 'aria-hidden': 'true' }, isOpen ? '\u2013' : '+')
            ),
            h('div', { className: 'faq-item__panel', style: { maxHeight: maxHeight } },
                h('p', { className: 'faq-item__answer', ref: contentRef }, props.answer)
            )
        );
    }

    function FaqAccordion(props) {
        var stateOpen = useState(0);
        var openIndex = stateOpen[0], setOpenIndex = stateOpen[1];

        return h('div', { className: 'faq-list faq-list--react' },
            props.faqs.map(function (faq, i) {
                return h(FaqItem, {
                    key: i,
                    question: faq.question,
                    answer: faq.answer,
                    isOpen: openIndex === i,
                    onToggle: function () { setOpenIndex(openIndex === i ? -1 : i); },
                });
            })
        );
    }

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('faq-accordion-root');
        if (!root || !window.React || !window.ReactDOM) return;
        var faqs = [];
        try {
            faqs = JSON.parse(root.getAttribute('data-faqs') || '[]');
        } catch (e) {
            faqs = [];
        }
        if (!faqs.length) return;
        root.innerHTML = '';
        var reactRoot = ReactDOM.createRoot(root);
        reactRoot.render(h(FaqAccordion, { faqs: faqs }));
    });
})();
