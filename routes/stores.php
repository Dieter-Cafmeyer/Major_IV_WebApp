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

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  if(!$token->hasSameUserId($args['id']) && !$token->isAdmin()){
    $response = $response->withStatus(403);
    return $response;
  }

  $storeDAO = new StoreDAO();
  $user = $storeDAO->selectById($args['id']);

  if(empty($user)){
    $response = $response->withStatus(400);
    return $response;
  }

  $response->getBody()->write(json_encode($user));
  return $response->withHeader('Content-Type','application/json');

});

