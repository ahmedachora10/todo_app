<?php

class Db
{
    private static $instance;
    const OPTIONS = array(
        \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8', // Write abrabic
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
    );

    private function __construct()
    {
    }

    private function __clone()
    {
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            try {
                self::$instance = new \PDO("mysql://host=" . DATABASE_HOST_NAME . ";dbname=" . DATABASE_DB_NAME, DATABASE_USER_NAME, DATABASE_PASSWORD, self::OPTIONS);
            } catch (\PDOException $e) {
                //throw $th;
            }
        }

        return self::$instance;
    }
}