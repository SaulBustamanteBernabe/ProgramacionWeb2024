<?php

namespace app\classes;

class Autoloader {
    public static function register() {
        spl_autoload_register([__CLASS__, 'autoload']);
    }

    public static function autoload($classname) {
        $classname = CLASSES_PATH . str_replace('\\', DS, $classname) . '.php';
        if(file_exists($classname)) {
            require_once $classname;
        } else {
            die('La clase ' . $classname . ' no existe');
        }
        return;
    }
}

?>