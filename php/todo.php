<?php

require_once 'config.php';
require_once PATH . 'controller' . DS . 'TodoController.php';
$todo = new TodoController();

if (isset($_GET['title']) && isset($_GET['add'])) {
    $title = $_GET['title'];

    $todo->setTodo($title);
}

if (isset($_GET['id']) && isset($_GET['delete'])) {
    $todo->deleteTodo();
    exit;
}

if (isset($_GET['id']) && isset($_GET['edit'])) {

    $title = $_GET['title'];
    $t = TodoModel::pKey($_GET['id']);
    $t->title = $title;

    if ($t->save()) {
        echo json_encode(['done!']);
    }
    exit;
}

if (isset($_GET['id']) && isset($_GET['complete'])) {
    $status = $_GET['status'];
    $t = TodoModel::pKey($_GET['id']);
    $t->status = $status;

    if ($t->save()) {
        echo json_encode(['done!']);
    }

    // $todo->editTodo(function ($t) {
    //     $status = $_GET['status'];
    //     $t->status = $status;
    //     echo json_encode([$t->status]);
    // });
    exit;
}

if (isset($_GET['mark'])) {
    $current_date = $_GET['date'];
    $t = new TodoModel();
    $t->update_status('1', trim($current_date));
    exit;
}

if (isset($_GET['deleteAll'])) {
    $current_date = $_GET['date'];
    TodoModel::clear($current_date);
    exit;
}

$todo->getAllTodos();
