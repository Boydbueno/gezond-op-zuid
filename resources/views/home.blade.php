@extends('app')

@section('content')
    <div class="container">
        <div class="row">

        </div>
    </div>
@endsection

@section('scripts')
    <script>
        var conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        conn.onopen = function(e) {
            console.log("Connection established!");

            conn.send(JSON.stringify({'message': 'Tosti!'}));
        };

        conn.onmessage = function(e) {
            console.log(e.data);
        };
    </script>
@endsection
