<?php // Uso: view('components/usecase-card', ['title' => '...', 'description' => '...']) ?>
<article class="usecase-card">
    <h3 class="usecase-card__title"><?= esc($title ?? '') ?></h3>
    <p class="usecase-card__description"><?= esc($description ?? '') ?></p>
</article>
