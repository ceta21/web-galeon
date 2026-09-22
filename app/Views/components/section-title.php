<?php
// Uso: view('components/section-title', ['eyebrow' => '...', 'title' => '...', 'subtitle' => '...'])
?>
<div class="section-title">
    <?php if (! empty($eyebrow)): ?>
        <span class="section-title__eyebrow"><?= esc($eyebrow) ?></span>
    <?php endif; ?>
    <h2 class="section-title__title"><?= esc($title ?? '') ?></h2>
    <?php if (! empty($subtitle)): ?>
        <p class="section-title__subtitle"><?= esc($subtitle) ?></p>
    <?php endif; ?>
</div>
