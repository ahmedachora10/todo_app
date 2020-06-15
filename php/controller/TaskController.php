<?php

require_once PATH . 'model' . DS . 'TaskModel.php';

class TaskController
{
    public $id;

    public function getAllTasks()
    {
        header("Content-Type: application/json");
        echo json_encode(['data' => TasksModel::getAll()], JSON_PRETTY_PRINT);
    }

    public function setTask()
    {

        if (isset($_POST['tag'])) {
            $title = $_POST['title'];
            $tag = $_POST['tag'];
            $todos = $_POST['todos'];
            $dates = $_POST['dates'];
            $date_start = $_POST['s_date'];
            $date_end = $_POST['e_date'];


            $id = [];
            for ($i = 0; $i < count($todos); $i++) {
                $new_todo = new TodoModel($todos[$i]);
                $new_todo->date = $this->dateFormat($dates[$i]);
                // $new_todo->task_id = $new_task->id;
                if ($new_todo->save()) {
                    $id[] = $new_todo->id;
                }
            }

            $new_task = new TasksModel();
            $new_task->todos = serialize($id);
            $new_task->title = $title;
            $new_task->tag = $tag;
            $new_task->date_start = $this->dateFormat($date_start);
            $new_task->date_end = $this->dateFormat($date_end);

            if ($new_task->save()) {
                foreach (unserialize($new_task->todos) as $id) {
                    $update_todo = TodoModel::pKey($id);
                    $update_todo->task_id = $new_task->id;
                    if ($update_todo->save()) {
                    }
                }
            }
            echo json_encode(['Success']);
            exit;
        }
    }

    public function deleteTask()
    {
        $select_task = TasksModel::pKey($_GET['id']);
        $isDelete = false;
        foreach (unserialize($select_task->todos) as $id) {
            $select_todo = TodoModel::pKey($id);
            if ($select_todo->delete()) {
                $isDelete = true;
            } else {
                $isDelete = false;
            }
        }

        if ($isDelete) {
            $msg = [];
            if ($select_task->delete()) {
                $msg[] = 'Deleted';
            } else {
                $msg[] = 'Wrong';
            }
            echo json_encode($msg);
        }
    }

    private function dateFormat($d)
    {
        $date = new DateTime($d);
        return $date->format('D M d Y');
    }
}
