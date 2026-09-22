<?php // Uso: view('components/faq-item', ['question' => '...', 'answer' => '...']) ?>
<details class="faq-item">
    <summary class="faq-item__question"><?= esc($question ?? '') ?></summary>
    <p class="faq-item__answer"><?= esc($answer ?? '') ?></p>
</details>
