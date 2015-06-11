<?php namespace Vitalous\Http\Controllers;

class ClientController extends Controller {

	/**
	 * @return Response
	 */
	public function index() {
		return view('client');
	}

}
