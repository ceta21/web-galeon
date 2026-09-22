<section class="contact-cta" id="contacto">
    <div class="contact-cta__container" data-reveal>
        <span class="section-title__eyebrow">Empecemos</span>
        <h2>¿Listo para automatizar tu negocio?</h2>
        <p>Cuéntanos qué proceso te quita más tiempo o qué web necesitas, y te devolvemos una propuesta concreta en menos de 24h.</p>

        <?php if (session()->getFlashdata('success')): ?>
            <div class="alert alert--success" role="status"><?= esc(session()->getFlashdata('success')) ?></div>
        <?php endif; ?>

        <form action="<?= base_url('/contacto/enviar') ?>" method="post" class="contact-form" novalidate>
            <?= csrf_field() ?>

            <div class="contact-form__row">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="name" value="<?= esc(old('name')) ?>" required>
                <?php if (session('errors.name')): ?><span class="contact-form__error"><?= esc(session('errors.name')) ?></span><?php endif; ?>
            </div>

            <div class="contact-form__row">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" value="<?= esc(old('email')) ?>" required>
                <?php if (session('errors.email')): ?><span class="contact-form__error"><?= esc(session('errors.email')) ?></span><?php endif; ?>
            </div>

            <div class="contact-form__row">
                <label for="message">Cuéntanos tu proyecto</label>
                <textarea id="message" name="message" rows="4" required><?= esc(old('message')) ?></textarea>
                <?php if (session('errors.message')): ?><span class="contact-form__error"><?= esc(session('errors.message')) ?></span><?php endif; ?>
            </div>

            <button type="submit" class="btn btn--primary btn--lg">Enviar</button>
        </form>

        <p class="contact-cta__alt">O escríbenos directamente a <a href="mailto:galeon@gmail.com">galeon@gmail.com</a></p>
    </div>
</section>
