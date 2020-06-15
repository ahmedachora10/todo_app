<?php
require_once 'config.php';
require_once PATH . 'model' . DS . 'TodoModel.php';
require_once PATH . 'controller' . DS . 'TaskController.php';
$task = new TaskController();


$task->setTask();

if (isset($_GET['id']) && isset($_GET['delete'])) {
    $task->deleteTask();
    exit;
}

if (isset($_GET['id']) && isset($_GET['edit'])) {

    $title = $_GET['title'];
    $t = TasksModel::pKey($_GET['id']);
    $t->title = $title;

    if ($t->save()) {
        echo json_encode(['done!']);
    }
    exit;
}

/* * Completed Action * */
if (isset($_GET['id']) && isset($_GET['complete'])) {
    $status = $_GET['status'];
    $t = TasksModel::pKey($_GET['id']);
    $t->status = $status;

    if ($t->save()) {
        $isSaved = false;
        if ($t->status == '0') {
            foreach (unserialize($t->todos) as $id) {
                $todo = TodoModel::pKey($id);
                $todo->status = '0';
                if ($todo->save()) {
                    $isSaved = true;
                }
            }
        } else {
            foreach (unserialize($t->todos) as $id) {
                $todo = TodoModel::pKey($id);
                $todo->status = '1';
                if ($todo->save()) {
                    $isSaved = true;
                }
            }
        }
        if ($isSaved) {
            echo json_encode(['done!']);
        }
    }

    exit;
}


if (isset($_GET['deleteAll'])) {
    $current_date = $_GET['date'];
    TasksModel::clear($current_date);
    exit;
}

$task->getAllTasks();
