<?php

require_once PATH . 'db' . DS . 'Db.php';

class MainModel
{
    const DATA_TYPE_BOOL = \PDO::PARAM_BOOL;
    const DATA_TYPE_STR = \PDO::PARAM_STR;
    const DATA_TYPE_INT = \PDO::PARAM_INT;
    const DATA_TYPE_DECIMAL = 4;

    private function prepareValue(\PDOStatement &$stm)
    {
        foreach (static::viewTableSchema() as $column => $type) {

            if ($type == 4) {
                $sanitizeF = filter_var($this->$column, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                $stm->bindValue(":{$column}", $sanitizeF);
            } else {
                $stm->bindValue(":{$column}", $this->$column, $type); // ربط الاعمدة مع المتغيرات و تحديد نوعه
            }
        }
    }

    public static function viewTableSchema()
    {
        return static::$tableSchema;
    }

    // Column Data Base
    private static function columnDataBase()
    {
        $col = '';
        foreach (static::viewTableSchema() as $column => $type) {
            $col .= $column . ' = :' . $column . ', ';
        }
        return trim($col, ', ');
    }

    // Create
    private function create()
    {

        $sql = 'INSERT INTO ' . static::$tableName . ' SET ' . static::columnDataBase();
        $stm = Db::getInstance()->prepare($sql);
        $this->prepareValue($stm);

        if ($stm->execute()) {
            $this->{static::$primaryKey} = Db::getInstance()->lastInsertId();
            return true;
        }

        return false;
    }
    // Update Status
    public function update_status($status, $date)
    {

        $sql = 'UPDATE ' . static::$tableName . ' SET status="' . $status . '" WHERE date="' . trim($date) . '"';
        $stm = Db::getInstance()->prepare($sql);
        $this->prepareValue($stm);
        return $stm->execute();
    }

    // Update
    private function update()
    {

        $sql = 'UPDATE ' . static::$tableName . ' SET ' . static::columnDataBase() . ' WHERE ' . static::$primaryKey . ' =' . $this->{static::$primaryKey};
        $stm = Db::getInstance()->prepare($sql);
        $this->prepareValue($stm);
        return $stm->execute();
    }

    // Delete
    public function delete()
    {

        $sql = 'DELETE FROM ' . static::$tableName . ' WHERE ' . static::$primaryKey . ' = ' . $this->{static::$primaryKey};

        $stm = Db::getInstance()->prepare($sql);
        return $stm->execute();
    }

    // Get All Data Of DATABASE
    public static function getAll()
    {

        $sql = 'SELECT * FROM ' . static::$tableName;
        $stm = Db::getInstance()->prepare($sql);

        if ($stm->execute() === true) {
            $ob = $stm->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, get_called_class(), array_keys(static::viewTableSchema()));
            return $ob;
        } else {
            return false;
        }
    }

    // Get All Data Of DATABASE
    public static function pKey($pk)
    {

        $sql = 'SELECT * FROM ' . static::$tableName . ' WHERE ' . static::$primaryKey . ' = "' . $pk . '"';
        $stm = Db::getInstance()->prepare($sql);
        if ($stm->execute() === true) {
            $ob = $stm->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, get_called_class(), array_keys(static::viewTableSchema()));
            return !empty($ob) ? array_shift($ob) : false;
        }
        return false;
    }

    public function save($primaryKeyCheck = true)
    {
        if (false === $primaryKeyCheck) {
            return $this->create();
        }
        return $this->{static::$primaryKey} == null ? $this->create() : $this->update();
    }

    public static function clear($date)
    {
        $sql = 'DELETE FROM ' . static::$tableName . ' WHERE date= "' . $date . '"';

        $stm = Db::getInstance()->prepare($sql);
        return $stm->execute();
    }

    public static function deleteAll()
    {
        $sql = 'TRUNCATE ' . static::$tableName;
        $stm = Db::getInstance()->prepare($sql);
        if ($stm->execute() === true) {
            return true;
        }
        return false;
    }
}
