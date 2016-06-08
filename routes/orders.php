<?php

require_once WWW_ROOT . 'dao' . DS . 'OrderDAO.php';
require_once WWW_ROOT . 'classes' . DS . 'Token.php';

use PHPassLib\Hash\BCrypt;

//401 unauthorized
//403 forbidden
$base = '/api/orders';

$app->get($base, function($request, $response, $args){
  $token = new Token();
  $token->setFromRequest($request);

  $query = $request->getQueryParams();
  $orderDAO = new OrderDAO();

  $data = array();

  if(empty($query)){
    $data= $orderDAO->selectAll();
  }else{
    if(!empty($query['userid']) && !empty($query['productid'])) {
      $data = $orderDAO->checkAlreadyOrdered($query['productid'], $query['userid']);
    }else if(!empty($query['productid'])){
      $data = $orderDAO->selectByProductId($query['productid']);
    }else if(!empty($query['userid'])){
      $data = $orderDAO->selectByUserId($query['userid']);
    }else if(!empty($query['basket'])){
      $data= $orderDAO->selectBasket();
    }
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');
});


$app->post($base, function($request, $response, $args){

  $orderDAO = new OrderDAO();
  $order = $request->getParsedBody();

  $insertedOrder = $orderDAO->insert($order);

  if(empty($insertedOrder)) {
    $errors = array();
    $errors['errors'] = $orderDAO->getValidationErrors($order);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedOrder));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');

});


