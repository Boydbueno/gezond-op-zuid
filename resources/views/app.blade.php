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

@yield('content')

<!-- Scripts -->
<script src="{{ asset('/bower/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('/bower/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/JSXTransformer.js"></script>
<script src="{{ asset('/bower/react-router/build/umd/ReactRouter.min.js') }}"></script>

@yield('scripts', '')

</body>
</html>
