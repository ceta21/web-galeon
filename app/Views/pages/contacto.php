<?= $this->extend('layouts/main') ?>

<?= $this->section('content') ?>

    <section class="page-header">
        <span class="hero__eyebrow">GALEON</span>
        <h1>Hablemos de tu proyecto</h1>
        <p>Cuéntanos qué te gustaría automatizar o qué web necesitas — te respondemos con una propuesta concreta.</p>
    </section>

    <?= view('components/contact-form') ?>

<?= $this->endSection() ?>
