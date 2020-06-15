<?php
define('DS', DIRECTORY_SEPARATOR);

define('PATH', realpath(dirname(__FILE__)) . DS);

const DATABASE_USER_NAME = "root";
const DATABASE_HOST_NAME = "localhost";
const DATABASE_DB_NAME = "todo_lists";
const DATABASE_PASSWORD = "";

require_once PATH . 'db' . DS . 'Db.php';