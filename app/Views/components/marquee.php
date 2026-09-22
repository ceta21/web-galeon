<?php
// Uso: view('components/marquee', ['items' => ['Automatización', 'Inteligencia artificial', ...]])
$items = $items ?? [];
$line = implode(' &nbsp;·&nbsp; ', array_map('esc', $items));
?>
<div class="marquee" aria-hidden="true">
    <div class="marquee__track">
        <span class="marquee__item"><?= $line ?>&nbsp;·&nbsp;</span>
        <span class="marquee__item"><?= $line ?>&nbsp;·&nbsp;</span>
    </div>
</div>
