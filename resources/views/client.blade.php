@extends('app')

@section('content')
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Gezond op Zuid - Client</a>
            </div>
        </div>
    </nav>

    <div class="container" id="app">

    </div>
@endsection

@section('scripts')
    <script>

    </script>

    <script type="text/jsx" src="{{ asset('/js/components/playerNameForm.js') }}"></script>
    <script type="text/jsx" src="{{ asset('/js/components/client.js') }}"></script>
@endsection
