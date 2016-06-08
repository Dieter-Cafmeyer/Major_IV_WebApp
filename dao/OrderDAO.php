<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class OrderDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *
            FROM `sdam_orders`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectBasket(){
    $sql = "SELECT store_id, name, description, price, image, tags, logo, `sdam_products`.id FROM `sdam_products` INNER JOIN `sdam_orders` ON `sdam_products`.id = `sdam_orders`.product_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `sdam_orders`
            WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectByProductId($id) {
    $sql = "SELECT *
            FROM `sdam_orders`
            WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectByUserId($id) {
    $sql = "SELECT * FROM `sdam_orders` WHERE `user_id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function checkAlreadyOrdered($productid, $userid) {
    $sql = "SELECT * FROM `sdam_orders` WHERE `user_id` = :userid AND `product_id` = :productid";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':userid', $userid);
    $stmt->bindValue(':productid', $productid);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `sdam_orders` (`user_id`, `product_id`) VALUES (:userid, :productid)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':userid', $data['userid']);
      $stmt->bindValue(':productid', $data['productid']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['userid'])) {
      $errors['userid'] = 'please enter the userid';
    }
    if(empty($data['productid'])) {
      $errors['productid'] = 'please enter the productid';
    }
    return $errors;
  }
}
