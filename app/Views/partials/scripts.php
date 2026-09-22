<script src="<?= base_url('assets/js/app.js') ?>" defer></script>
<?php if (! empty($page_js)): ?>
    <script src="<?= base_url('assets/js/pages/' . $page_js) ?>" defer></script>
<?php endif; ?>

<!-- React (CDN, sin build step) — solo para las piezas animadas: logo del hero y tarjetas de servicios -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin defer></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin defer></script>
<script src="<?= base_url('assets/js/react/hero-logo.js') ?>" defer></script>
<script src="<?= base_url('assets/js/react/hero-particles.js') ?>" defer></script>
<script src="<?= base_url('assets/js/react/hero-rotator.js') ?>" defer></script>
<script src="<?= base_url('assets/js/react/scrollspy.js') ?>" defer></script>
<script src="<?= base_url('assets/js/react/feature-cards.js') ?>" defer></script>
<script src="<?= base_url('assets/js/react/faq-accordion.js') ?>" defer></script>
<script src="<?= base_url('assets/js/react/chat-widget.js') ?>" defer></script>
