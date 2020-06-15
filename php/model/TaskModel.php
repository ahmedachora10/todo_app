<?php

require_once PATH . 'model' . DS . 'MainModel.php';

class TasksModel extends MainModel
{

    public $id;
    public $user_id;
    public $title;
    public $tag;
    public $todos;
    public $status;
    public $date_start;
    public $date_end;
    public $created_at;

    protected static $tableName = 'tasks';

    protected static $primaryKey = 'id';

    protected static $tableSchema = array(
        'id' => self::DATA_TYPE_INT,
        'user_id' => self::DATA_TYPE_INT,
        'title' => self::DATA_TYPE_STR,
        'tag' => self::DATA_TYPE_STR,
        'todos' => self::DATA_TYPE_STR,
        'status' => self::DATA_TYPE_STR,
        'date_start' => self::DATA_TYPE_STR,
        'date_end' => self::DATA_TYPE_STR,
        'created_at' => self::DATA_TYPE_STR,
    );

    public function __construct()
    {
        $this->user_id = 1;
        $this->status = '0';
        $this->created_at = date('Y-m-d h:i:s', time());
    }

    public static function getAll()
    {

        $sql = 'SELECT * FROM ' . static::$tableName;
        $stm = Db::getInstance()->prepare($sql);

        if ($stm->execute() === true) {
            $ob = $stm->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, get_called_class(), array_keys(static::viewTableSchema()));

            foreach ($ob as $value) {
                foreach ($value as $key => $val) {
                    if ($key == 'todos') {
                        $value->{$key} = unserialize($val);
                    }
                }
            }
            return $ob;
        } else {
            return false;
        }
    }
}