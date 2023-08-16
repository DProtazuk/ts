<?php

class DB
{
    static function connect() {
        $dsn = 'mysql:host=localhost;dbname=ex-market';
        $username = 'root';
        $password = '';

        try {
            return new PDO($dsn, $username, $password);
        } catch (PDOException $e) {
            echo 'Подключение не удалось: ' . $e->getMessage();
        }
    }
}