<?php

namespace App\Controllers;

class Contact extends BaseController
{
    public function send()
    {
        $rules = [
            'name'    => 'required|min_length[2]|max_length[100]',
            'email'   => 'required|valid_email',
            'message' => 'required|min_length[10]',
        ];

        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        // Aquí se enviaría el email o se guardaría el lead (Model/Service según el proyecto real).

        return redirect()->to('/#contacto')->with('success', 'Gracias, hemos recibido tu mensaje. Te responderemos en menos de 24h.');
    }
}
