<?= $this->extend('layouts/main') ?>

<?= $this->section('content') ?>

    <?= view('components/hero', [
        'hero_eyebrow'  => $hero_eyebrow ?? '',
        'hero_title'    => $hero_title ?? '',
        'hero_subtitle' => $hero_subtitle ?? '',
        'hero_cta_text' => $hero_cta_text ?? 'Solicita una consultoría',
        'hero_cta_url'  => $hero_cta_url ?? '#contacto',
        'hero_secondary_cta_text' => $hero_secondary_cta_text ?? null,
        'hero_secondary_cta_url'  => $hero_secondary_cta_url ?? null,
        'hero_chips' => $hero_chips ?? [],
    ]) ?>

    <?= view('components/trust-bar', ['items' => $trust_items ?? []]) ?>

    <section class="section" id="servicios">
        <?= view('components/section-title', [
            'eyebrow' => 'Qué hacemos',
            'title'   => 'Servicios',
            'subtitle' => 'Combinamos automatización con IA y desarrollo web para que tu negocio funcione mejor con menos esfuerzo manual.',
        ]) ?>

        <!-- Montado por public/assets/js/react/feature-cards.js: entrada escalonada + tilt/spotlight con el ratón -->
        <div class="feature-grid" id="feature-cards-root" data-features='<?= esc(json_encode($features ?? []), 'attr') ?>'>
            <noscript>
                <?php foreach ($features ?? [] as $feature): ?>
                    <?= view('components/feature-card', $feature) ?>
                <?php endforeach; ?>
            </noscript>
        </div>
    </section>

    <section class="section section--muted" id="nosotros">
        <div class="about">
            <div class="about__text" data-reveal>
                <span class="section-title__eyebrow">Quiénes somos</span>
                <h2>Tu aliado digital en automatización e IA</h2>
                <p><?= esc($about_text ?? '') ?></p>
            </div>
            <div class="about__points" data-reveal>
                <?php foreach ($about_points ?? [] as $point): ?>
                    <?= view('components/stat-point', $point) ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="section" id="casos-de-uso">
        <?= view('components/section-title', [
            'eyebrow' => 'Casos de uso',
            'title'   => 'Qué puedes automatizar con GALEON',
            'subtitle' => 'Algunos ejemplos habituales de lo que integramos para nuestros clientes.',
        ]) ?>

        <div class="usecase-grid" data-reveal>
            <?php foreach ($use_cases ?? [] as $case): ?>
                <?= view('components/usecase-card', $case) ?>
            <?php endforeach; ?>
        </div>

        <?php if (! empty($quote_text)): ?>
            <blockquote class="quote-block" data-reveal>
                <p>&ldquo;<?= esc($quote_text) ?>&rdquo;</p>
                <cite>— GALEON</cite>
            </blockquote>
        <?php endif; ?>
    </section>

    <?= view('components/marquee', ['items' => ['Automatización', 'Inteligencia artificial', 'Desarrollo web', 'Integraciones', 'Consultoría']]) ?>

    <section class="section section--muted" id="proceso">
        <?= view('components/section-title', [
            'eyebrow' => 'Cómo trabajamos',
            'title'   => 'De la idea al lanzamiento',
            'subtitle' => 'Un proceso claro, sin sorpresas, pensado para avanzar rápido sin perder calidad.',
        ]) ?>

        <div class="process-grid" data-reveal>
            <?php foreach ($process_steps ?? [] as $step): ?>
                <?= view('components/process-step', $step) ?>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="section" id="paquetes">
        <?= view('components/section-title', [
            'eyebrow' => 'Cómo empezar',
            'title'   => 'Elige cómo quieres empezar',
            'subtitle' => 'Cada servicio funciona de forma independiente — no hace falta contratarlo todo junto.',
        ]) ?>

        <div class="package-grid" data-reveal>
            <?php foreach ($packages ?? [] as $package): ?>
                <?= view('components/package-card', $package) ?>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="section section--muted" id="faqs">
        <?= view('components/section-title', [
            'eyebrow' => 'Dudas frecuentes',
            'title'   => 'Preguntas frecuentes',
        ]) ?>

        <!-- Montado por public/assets/js/react/faq-accordion.js -->
        <div id="faq-accordion-root" data-faqs='<?= esc(json_encode($faqs ?? []), 'attr') ?>'>
            <noscript>
                <div class="faq-list">
                    <?php foreach ($faqs ?? [] as $faq): ?>
                        <?= view('components/faq-item', $faq) ?>
                    <?php endforeach; ?>
                </div>
            </noscript>
        </div>
    </section>

    <?= view('components/contact-form') ?>

<?= $this->endSection() ?>
