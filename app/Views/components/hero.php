<?php
// Espera: $hero_eyebrow, $hero_title, $hero_subtitle, $hero_cta_text, $hero_cta_url,
// $hero_secondary_cta_text, $hero_secondary_cta_url
?>
<section class="hero">
    <div class="hero__grid" aria-hidden="true"></div>
    <div id="hero-particles-root" class="hero-particles" aria-hidden="true"></div>

    <div class="hero__content" data-reveal>
        <?php if (! empty($hero_eyebrow)): ?>
            <span class="hero__eyebrow"><?= esc($hero_eyebrow) ?></span>
        <?php endif; ?>

        <h1 class="hero__title"><?= esc($hero_title ?? 'Título específico del beneficio principal') ?></h1>
        <p class="hero__subtitle"><?= esc($hero_subtitle ?? '') ?></p>

        <!-- Montado por public/assets/js/react/hero-rotator.js -->
        <div id="hero-rotator-root" data-prefix="Ahora mismo podemos automatizar: " data-words='["la atención al cliente","la gestión de leads","el reporting","la generación de contenido"]'></div>

        <div class="hero__actions">
            <a href="<?= esc($hero_cta_url ?? base_url('/contacto')) ?>" class="btn btn--primary btn--lg">
                <?= esc($hero_cta_text ?? 'Empezar ahora') ?>
            </a>
            <?php if (! empty($hero_secondary_cta_text)): ?>
                <a href="<?= esc($hero_secondary_cta_url ?? '#') ?>" class="btn btn--ghost btn--lg">
                    <?= esc($hero_secondary_cta_text) ?>
                </a>
            <?php endif; ?>
        </div>
    </div>

    <div class="hero__media">
        <div class="hero__orb" aria-hidden="true"></div>

        <!-- Montado por public/assets/js/react/hero-logo.js: flotación continua + tilt con el ratón -->
        <div id="hero-logo-root" class="hero__logo-root" data-logo-src="<?= base_url('assets/img/logo/galeon-logo.png') ?>"></div>

        <noscript>
            <img src="<?= base_url('assets/img/logo/galeon-logo.png') ?>" alt="GALEON" class="hero__logo-mark">
        </noscript>

        <?php if (! empty($hero_chips)): ?>
            <div class="hero__chips" aria-hidden="true">
                <?php foreach ($hero_chips as $i => $chip): ?>
                    <div class="hero__chip hero__chip--<?= $i + 1 ?>"><?= view('components/hero-chip', ['text' => $chip]) ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
