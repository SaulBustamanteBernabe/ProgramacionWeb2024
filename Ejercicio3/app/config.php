<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', __DIR__ . DS);

define('IS_LOCAL', in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']) ? true : false);
define('URL', IS_LOCAL ? 'http://forofie.des/' : 'REMOTE URL');

// define('DB_HOST', IS_LOCAL ? 'localhost' : 'REMOTE HOST');

define('CLASSES', ROOT . 'classes' . DS);
define('CLASSES_PATH', ROOT . '..' . DS);

?>