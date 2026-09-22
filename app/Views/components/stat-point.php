<?php // Uso: view('components/stat-point', ['title' => '...', 'description' => '...']) ?>
<div class="stat-point">
    <h3 class="stat-point__title"><?= esc($title ?? '') ?></h3>
    <p class="stat-point__description"><?= esc($description ?? '') ?></p>
</div>
