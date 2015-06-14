<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vitalous</title>

    <link href="{{ asset('/bower/bootstrap/dist/css/bootstrap.css') }}" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('/css/style.css') }}"/>
</head>
<body>

<div id="app" class="group"></div>

<!-- Scripts -->
<script src="https://www.google.com/jsapi"></script>
<script src="{{ asset('/bower/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('/bower/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('/bower/react/react-with-addons.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/JSXTransformer.js"></script>
<script src="{{ asset('/bower/react-router/build/umd/ReactRouter.js') }}"></script>
<script src="{{ asset('/js/bundle.js') }}"></script>

</body>
</html>
