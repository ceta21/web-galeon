<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Fragmento de referencia para app/Config/Routes.php — añadir dentro del archivo real del proyecto,
// no sustituir el archivo completo (que incluye configuración adicional de CodeIgniter 4).

$routes->get('/', 'Home::index');
$routes->get('/contacto', 'Pages::contacto');
$routes->post('/contacto/enviar', 'Contact::send');
$routes->post('/asistente/responder', 'Assistant::reply');
