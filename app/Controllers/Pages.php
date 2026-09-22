<?php

namespace App\Controllers;

class Pages extends BaseController
{
    public function contacto()
    {
        $data = [
            'title'            => 'Contacto — GABX LABS',
            'meta_description' => 'Cuéntanos qué quieres automatizar o qué web necesitas. Te respondemos con una propuesta clara.',
            'page_css'         => 'contacto.css',
        ];

        return view('pages/contacto', $data);
    }
}
