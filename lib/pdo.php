<?php

include "../config/config.php";


try
{   $dbh = new PDO("mysql:dbname=".$config['DB_NAME'].";host=".$config['DB_HOST']."", $config['DB_USER'], $config['DB_PASS'] );
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

}
catch(PDOException $err)
{
    echo '<pre style="color:red;">';
    print_r($err->getMessage());
    print_r($err->getLine());
    print_r($err->getTrace());
    print_r($err->getTraceAsString());
    //var_dump($dbh->errorInfo());
    echo '</pre>';
    exit();
}