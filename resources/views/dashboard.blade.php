@extends('app')

@section('content')
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Gezond op Zuid - Dashboard</a>
            </div>
        </div>
    </nav>

    <div class="container" id="app">
        <div class="row">

        </div>
    </div>
@endsection

@section('scripts')
    <script>
        var conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        conn.onopen = function(e) {
            console.log("Connection established!");
        };

        conn.onmessage = function(e) {
            var message = JSON.parse(e.data);

            switch(message.event) {

                case 'player:joined':
                    console.log(message.data.name + " has joined!");
                    break;

            }
        };
    </script>
@endsection
