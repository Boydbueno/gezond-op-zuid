<?php

Route::get('/', function() {

    JavaScript::put([
        'websockets' => Config::get('websockets')
    ]);

    return view('index');
});
