<?php
// Uso: view('components/package-card', ['name' => '...', 'price_label' => '...', 'description' => '...', 'items' => [...], 'featured' => bool])
$featured = $featured ?? false;
?>
<article class="package-card<?= $featured ? ' package-card--featured' : '' ?>">
    <?php if ($featured): ?>
        <span class="package-card__badge">Recomendado</span>
    <?php endif; ?>
    <h3 class="package-card__name"><?= esc($name ?? '') ?></h3>
    <p class="package-card__price"><?= esc($price_label ?? '') ?></p>
    <p class="package-card__description"><?= esc($description ?? '') ?></p>
    <ul class="package-card__items">
        <?php foreach ($items ?? [] as $item): ?>
            <li><?= esc($item) ?></li>
        <?php endforeach; ?>
    </ul>
    <a href="#contacto" class="btn <?= $featured ? 'btn--primary' : 'btn--ghost' ?> package-card__cta">Solicitar presupuesto</a>
</article>
