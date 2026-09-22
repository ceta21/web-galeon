<!DOCTYPE html>
<html lang="es">
<?= $this->include('partials/head') ?>
<body>
    <?= view('components/navbar') ?>

    <main>
        <?= $this->renderSection('content') ?>
    </main>

    <?= view('components/footer') ?>

    <?= view('components/chat-widget') ?>

    <?= $this->include('partials/scripts') ?>
</body>
</html>
