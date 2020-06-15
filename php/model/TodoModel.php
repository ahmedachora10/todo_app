<?php

require_once PATH . 'model' . DS . 'MainModel.php';
require_once PATH . 'model' . DS . 'TaskModel.php';

class TodoModel extends MainModel
{

    public $id;
    public $user_id;
    public $task_id;
    public $title;
    public $status;
    public $date;

    protected static $tableName = 'todo';

    protected static $primaryKey = 'id';

    protected static $tableSchema = array(
        'id' => self::DATA_TYPE_INT,
        'user_id' => self::DATA_TYPE_INT,
        'task_id' => self::DATA_TYPE_INT,
        'title' => self::DATA_TYPE_STR,
        'status' => self::DATA_TYPE_STR,
        'date' => self::DATA_TYPE_STR,
    );

    public function __construct(string $title = '')
    {
        if ($title == '') {
            return false;
        }
        $this->title = $title;
        $this->user_id = 1;
        $this->task_id = 0;
        $this->status = '0';
        $this->date = $this->dateFormat();
    }

    private function dateFormat()
    {
        $date = new DateTime(date('Y-m-d h:i:s', time()));
        return $date->format('D M d Y');
    }

    public static function getTodos()
    {
        $allData = self::getAll();

        foreach ($allData as $val) {
            if ($val->task_id != 0) {
                $task = TasksModel::pKey($val->task_id);
                $val->task_id = $task->tag;
            }
        }

        return $allData;
    }
}
