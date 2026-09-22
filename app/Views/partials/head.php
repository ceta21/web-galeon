<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?= esc($title ?? 'GALEON') ?></title>
    <meta name="description" content="<?= esc($meta_description ?? '') ?>">

    <meta property="og:title" content="<?= esc($title ?? '') ?>">
    <meta property="og:description" content="<?= esc($meta_description ?? '') ?>">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_ES">
    <meta property="og:image" content="<?= base_url('assets/img/logo/galeon-logo.png') ?>">

    <link rel="icon" href="<?= base_url('assets/img/logo/galeon-logo.png') ?>">

    <!-- Token CSRF para las peticiones AJAX del widget de chat (public/assets/js/react/chat-widget.js) -->
    <meta name="csrf-token-name" content="<?= csrf_token() ?>">
    <meta name="csrf-token-hash" content="<?= csrf_hash() ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="<?= base_url('assets/css/app.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/components.css') ?>">
    <?php if (! empty($page_css)): ?>
        <link rel="stylesheet" href="<?= base_url('assets/css/pages/' . $page_css) ?>">
    <?php endif; ?>
</head>

