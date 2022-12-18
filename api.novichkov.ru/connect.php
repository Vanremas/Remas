<?php

$connect = mysqli_connect('localhost', 'root','','Boogs');
if(!$connect) {
    $connect = mysqli_connect('localhost', 'root','root','Boogs');
}
