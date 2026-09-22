<?php
// Uso: view('components/feature-card', ['title' => '...', 'description' => '...'])
?>
<article class="feature-card">
    <h3 class="feature-card__title"><?= esc($title ?? '') ?></h3>
    <p class="feature-card__description"><?= esc($description ?? '') ?></p>
</article>
