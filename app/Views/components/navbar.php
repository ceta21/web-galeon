<header class="navbar">
    <div class="navbar__container">
        <a href="<?= base_url('/') ?>" class="navbar__logo">
            <img src="<?= base_url('assets/img/logo/galeon-logo.png') ?>" alt="GALEON" class="navbar__logo-img">
            GA<span>LEON</span>
        </a>

        <nav class="navbar__links" aria-label="Navegación principal">
            <a href="<?= base_url('/') ?>">Inicio</a>
            <a href="<?= base_url('/') ?>#servicios">Servicios</a>
            <a href="<?= base_url('/') ?>#nosotros">Nosotros</a>
            <a href="<?= base_url('/') ?>#proceso">Proceso</a>
            <a href="<?= base_url('/') ?>#paquetes">Paquetes</a>
            <a href="<?= base_url('/') ?>#faqs">FAQ</a>
            <a href="<?= base_url('/') ?>#contacto" class="btn btn--primary btn--sm">Hablemos</a>
        </nav>

        <button class="navbar__toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navbar-mobile">
            <span></span><span></span><span></span>
        </button>
    </div>

    <nav id="navbar-mobile" class="navbar__mobile" aria-label="Navegación móvil" hidden>
        <a href="<?= base_url('/') ?>">Inicio</a>
        <a href="<?= base_url('/') ?>#servicios">Servicios</a>
        <a href="<?= base_url('/') ?>#nosotros">Nosotros</a>
        <a href="<?= base_url('/') ?>#proceso">Proceso</a>
        <a href="<?= base_url('/') ?>#paquetes">Paquetes</a>
        <a href="<?= base_url('/') ?>#faqs">FAQ</a>
        <a href="<?= base_url('/') ?>#contacto" class="btn btn--primary">Hablemos</a>
    </nav>

    <!-- Montado por public/assets/js/react/scrollspy.js -->
    <div id="scrollspy-root"></div>
</header>
