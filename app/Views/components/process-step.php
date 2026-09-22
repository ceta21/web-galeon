<?php
// Uso: view('components/process-step', ['number' => '01', 'title' => '...', 'description' => '...'])
?>
<div class="process-step">
    <span class="process-step__number"><?= esc($number ?? '') ?></span>
    <h3 class="process-step__title"><?= esc($title ?? '') ?></h3>
    <p class="process-step__description"><?= esc($description ?? '') ?></p>
</div>
