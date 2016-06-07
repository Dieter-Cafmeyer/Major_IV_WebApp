<?php

require_once WWW_ROOT . 'dao' . DS . 'ProductDAO.php';
require_once WWW_ROOT . 'classes' . DS . 'Token.php';

use PHPassLib\Hash\BCrypt;

//401 unauthorized
//403 forbidden

$base = '/api/products';

$app->get($base, function($request, $response, $args){
  $token = new Token();
  $token->setFromRequest($request);

  $query = $request->getQueryParams();
  $productDAO = new ProductDAO();

  $data = array();

  if(empty($query)){
    $data= $productDAO->selectAll();
  }else{
    if(!empty($query['productid'])){
      $data = $productDAO->selectById($query['productid']);
    }else if(!empty($query['storeid'])){
      $data = $productDAO->selectByStoreId($query['storeid']);
    }
  }

  if(empty($data)){
    $response = $response->withStatus(400);
    return $response;
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

