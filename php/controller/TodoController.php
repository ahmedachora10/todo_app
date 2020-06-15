<?php

require_once PATH . 'model' . DS . 'TodoModel.php';

class TodoController
{
    public $message = [];
    public function getAllTodos(): void
    {
        header("Content-Type: application/json");
        echo json_encode(['data' => TodoModel::getTodos()]);
    }

    public function setTodo(string $title)
    {
        $new_todo = new TodoModel($title);
        if ($new_todo->save()) {
            $this->message['success'] = 'Todo has been Saved';
        } else {
            $this->message['wrong'] = 'Todo Not Saved';
        }
    }


    public function deleteTodo()
    {
        // header("Content-Type: application/json");

        $s_t = TodoModel::pKey($_GET['id']);
        if ($s_t->task_id != '0') {
            $task = TasksModel::pKey($s_t->task_id);

            $todo_ids = unserialize($task->todos);

            $result = array_filter($todo_ids, function ($id) {
                return $id != $_GET['id'];
            });

            $task->todos = serialize($result);

            if ($task->save()) {
            }
        }
        $msg = [];
        if ($s_t->delete()) {
            $msg[] = 'Deleted';
        } else {
            $msg[] = 'Wrong';
        }
        echo json_encode($msg);
    }
}
