<?php
// Uso: view('components/trust-bar', ['items' => [['label' => '...', 'value' => '...'], ...]])
?>
<div class="trust-bar">
    <?php foreach ($items ?? [] as $item): ?>
        <div class="trust-bar__item">
            <span class="trust-bar__value"><?= esc($item['value'] ?? '') ?></span>
            <span class="trust-bar__label"><?= esc($item['label'] ?? '') ?></span>
        </div>
    <?php endforeach; ?>
</div>
