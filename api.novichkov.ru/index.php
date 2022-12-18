<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

require 'connect.php';
require 'func.php';

$method = $_SERVER['REQUEST_METHOD'];

$q = $_GET['q'];

$par = explode('/', $q);
    $type = $par[0];


if(isset($par[1])) {
    $type2 = $par[1];
}
if(isset($par[2])) {
    $id = $par[2];
}

if ($method === 'GET') {

    if ($type === 'books') {
        if (isset($type2)) {
            if ($type2 === 'book') {
                getBook($connect, $id);
            } elseif ($type2 === 'genre') {
                getBBGenre($connect, $id);
            }
        } else {
            getBooks($connect);
        }
    }

} elseif ($method === 'POST') {
    if ($type === 'books'){

        if(isset($type2)) {
            if ($type2 === 'book') {
                if(isset($id)){
                    updateBook($connect, $id, $_POST, $_FILES);
                } else{addBook($connect, $_POST, $_FILES);}

    } if ($type2 === 'admin'){
                admin($connect, $_POST);
            }
        }}

}
elseif($method === 'DELETE'){
    if($type === 'books'){
        if(isset($type2)){
            if($type2 === 'book'){
                if(isset($id)){
                    deleteBook($connect, $id);
                }
            }
        }
    }
}









//$finame = upImg($_FILES['img']);
//
//addPost($_POST['title'], $_POST['name'],$_POST['genre'],$_POST['Year'],$_POST['description'],$finame);
//
//del();