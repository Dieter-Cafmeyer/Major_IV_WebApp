<?php

require_once WWW_ROOT . 'dao' . DS . 'StoreDAO.php';
require_once WWW_ROOT . 'classes' . DS . 'Token.php';

use PHPassLib\Hash\BCrypt;

//401 unauthorized
//403 forbidden

$base = '/api/stores';

$app->get($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  $storeDAO = new StoreDAO();

  $data = array();
  $data['stores'] = $storeDAO->selectAll();;

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base.'/{id}', function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  $storeDAO = new StoreDAO();
  $store = $storeDAO->selectById($args['id']);

  if(empty($store)){
    $response = $response->withStatus(400);
    return $response;
  }

  $response->getBody()->write(json_encode($store));
  return $response->withHeader('Content-Type','application/json');

});

