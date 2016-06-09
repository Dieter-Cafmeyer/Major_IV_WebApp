<?php

require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'classes' . DS . 'Token.php';

use PHPassLib\Hash\BCrypt;

//401 unauthorized
//403 forbidden

$base = '/api/users';

$app->get($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  if(!$token->isAdmin()){
    $response = $response->withStatus(403);
    return $response;
  }

  $userDAO = new UserDAO();

  $data = array();
  $data['users'] = $userDAO->selectAll();;

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

  $userDAO = new UserDAO();
  $user = $userDAO->selectById($args['id']);

  if(empty($user)){
    $response = $response->withStatus(400);
    return $response;
  }

  $response->getBody()->write(json_encode($user));
  return $response->withHeader('Content-Type','application/json');

});

$app->put($base, function ($request, $response, $args) {
  $userDAO = new UserDAO();
  $user = $request->getParsedBody();

  $updatedUser = $userDAO->update($user);
  $response = $response->write(json_encode($updatedUser))
    ->withHeader('Content-Type','application/json');
  if(empty($updatedUser)) {
    $response = $response->withStatus(404);
  }
  return $response;
});

$app->post($base, function($request, $response, $args){

  $userDAO = new UserDAO();

  $user = $request->getParsedBody();


  $existing = $userDAO->selectByEmail($user['email']);
  if (!empty($existing)) {
    $response = $response->withStatus(400);
    exit();
  }

  if($user['password']){
    $user['password'] = BCrypt::hash($user['password']);
  }

  $insertedUser = $userDAO->insert($user);

  if(empty($insertedUser)) {
    $errors = array();
    $errors['errors'] = $userDAO->getValidationErrors($user);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedUser));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');

});
