<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gezond op Zuid</title>

    <link href="{{ asset('/bower/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">

</head>
<body>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Gezond op Zuid</a>
        </div>
    </div>
</nav>

@yield('content')

<!-- Scripts -->
<script src="{{ asset('/bower/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('/bower/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<!-- Todo: Download autobahn -->
@yield('scripts', '')

</body>
</html>
