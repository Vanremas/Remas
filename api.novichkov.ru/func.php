<?php

function admin($connect, $data){

    $login = $data['login'];
    $password = $data['password'];
$usCheck = mysqli_query($connect, "SELECT * FROM `Admin` WHERE `login` = '$login' AND `password` = '$password'");
    if(mysqli_num_rows($usCheck) > 0){
        $res = [
            "status"=>true,
        ];
        echo json_encode($res);
    } else {
        $res = [
            "status"=>false,
        ];
        echo json_encode($res);

    }

}


function getBooks($connect){
    $Books = mysqli_query($connect, "SELECT
books.idBook as 'idBook',
Books.tittle as 'title',
Books.img as 'img',
Books.genre as 'genre',
Books.description as 'desc',
Books.year as 'year',
(SELECT GROUP_CONCAT(Authors.Author SEPARATOR ', ') FROM Authors, aIDb WHERE Authors.idAut = aIDb.idAut AND aIDb.idBook = Books.idBook) AS 'Author'

FROM Books");

    $BookList = [];
    while ($Book = mysqli_fetch_assoc($Books)) {
        $BookList[] = $Book;
    }

    echo json_encode($BookList);
}

function getBook($connect, $id)
{
    $Book = mysqli_query($connect, "SELECT books.idBook as 'idBook', Books.tittle as 'title', Books.year as 'year', Books.description as 'desc', Books.img as 'img', Books.genre as 'genre', (SELECT GROUP_CONCAT(Authors.Author SEPARATOR ', ') FROM Authors, aIDb WHERE Authors.idAut = aIDb.idAut AND aIDb.idBook = Books.idBook) AS 'author' FROM Books WHERE `idBook`= '$id';");
    if (mysqli_num_rows($Book) === 0) {
        http_response_code(404);
        $res = ["status" => false,
            "message" => "Не найдено."];
        echo json_encode($res);
    } else {
        $post = mysqli_fetch_assoc($Book);
        echo json_encode($post);

    }
}

function  getBBGenre($connect, $id){
if ($id==='1'){$genre = 'Фэнтези';}
elseif ($id==='2'){$genre = 'Повесть';}
elseif ($id==='3'){$genre = 'Ужасы';}
elseif ($id==='4'){$genre = 'Детектив';}

    $books = mysqli_query( $connect,"SELECT
 books.idBook as 'idBook',
    books.tittle AS 'title',
    books.img AS 'img',
    Books.genre AS 'genre',
    Books.description as 'desc',
    
    (SELECT GROUP_CONCAT(Authors.Author SEPARATOR ', ') FROM Authors, aIDb WHERE Authors.idAut = aIDb.idAut AND aIDb.idBook = Books.idBook) AS 'Author'
    
    FROM Books WHERE Books.genre = '$genre'");

       if(mysqli_num_rows($books) === 0){
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Книг в данном жанре нет."
        ];
        echo json_encode($res);
    } else {
        $booklist = [];
        while ($book = mysqli_fetch_assoc($books)){
            $booklist[] = $book;
        }
        echo json_encode($booklist);
    }


}





function addBook($connect, $data, $file){

    $exts = pathinfo($file['img']['name'], PATHINFO_EXTENSION);
    $filename = uniqid().".".$exts;
    move_uploaded_file($file['img']['tmp_name'], "../novichkov.ru/uploads/".$filename);



    $tittle = $data['tittle'];
    $desc = $data['description'];
    $year = $data['year'];
    $genre = $data['genre'];
$author = explode(', ', $data['author']);

$checkBook = mysqli_query( $connect,"SELECT `idBook` FROM `Books` WHERE `tittle`='$tittle'");
    $checkB = mysqli_fetch_assoc($checkBook);
    if(isset($checkB)) {
        $checkBb = $checkB['idBook'];
        if (isset($checkBb)) {

            $res = [
                "status"=>false,
            ];
            echo json_encode($res);
        }
    } else {

        mysqli_query( $connect, "INSERT INTO `Books` (`idBook`, `tittle`, `description`, `year`, `genre`, `img`) VALUES (NULL, '$tittle', '$desc', '$year', '$genre', '$filename')");
        $idBo = mysqli_insert_id($connect);

        for ($i = 0; $i < count($author); $i++){
            $author[$i] = rtrim($author[$i], ",");
            $author[$i] = rtrim($author[$i], " ");
            if(!mysqli_num_rows(mysqli_query($connect, "SELECT * FROM Authors WHERE author = '$author[$i]'"))){
                mysqli_query($connect, "INSERT INTO Authors (author) VALUES ('$author[$i]');");
            }
            mysqli_query($connect, "INSERT INTO aIDb (idAut, idBook) SELECT idAut, idBook FROM authors, books WHERE authors.author LIKE '$author[$i]' AND books.tittle LIKE '$tittle'");
        }


        http_response_code(201);

        $res = [
            "status"=>true,
            "post_id" =>$idBo
        ];
        echo json_encode($res);


    }


}

function updateBook($connect, $id, $data, $file){
if(isset($file['img'])){
    $img = $file['img'];
    $exts = pathinfo($img['name'], PATHINFO_EXTENSION);
    $filename = uniqid().".".$exts;
    move_uploaded_file($img['tmp_name'], "../novichkov.ru/uploads/".$filename);
    mysqli_query($connect, "UPDATE books SET img = '$filename' WHERE idBook = '$id'");
}
$author = explode(', ', $data['author']);
$tittle = $data['tittle'];
$year = $data['year'];
$desc = $data['description'];
$genre = $data['genre'];

    if($author[0] != ''){
        mysqli_query($connect, "DELETE FROM aIDb WHERE idBook = '$id'");
        for($i = 0; $i < count($author); $i++) {
            $author[$i] = rtrim($author[$i], ",");
            $author[$i] = rtrim($author[$i], " ");
            if(!mysqli_num_rows(mysqli_query($connect, "SELECT * FROM Authors WHERE author = '$author[$i]'"))){
                mysqli_query($connect, "INSERT INTO Authors (author) VALUES ('$author[$i]');");
            }
            mysqli_query($connect, "INSERT INTO aIDb (idAut, idBook) VALUES ((SELECT idAut FROM authors WHERE author = '$author[$i]'), '$id')");
        }
    }
    if($tittle != null){
        mysqli_query($connect, "UPDATE Books SET tittle = '$tittle' WHERE idBook = '$id'");
    }

    if($year != null){
        mysqli_query($connect, "UPDATE Books SET year = '$year' WHERE idBook = '$id'");
    }
    if($desc != null){
        mysqli_query($connect, "UPDATE books SET description = '$desc' WHERE idBook = '$id'");
    }

    if($genre != null){
        mysqli_query($connect, "UPDATE books SET genre = '$genre' WHERE idBook = '$id'");
    }
    http_response_code(200);

    $res = [
        "status" => true,
        "message" => "Book updated"
    ];

    echo json_encode($res);

}

function deleteBook($connect, $id){

    mysqli_query($connect, "DELETE FROM aIDb WHERE idBook = '$id'");
    mysqli_query($connect, "DELETE FROM books WHERE idBook = '$id'");

    http_response_code(200);

    $res = [
        "status" => true,
        "message" => "Книга Удалена"
    ];

    echo json_encode($res);

}




//function upImg($img){
//    $exts = pathinfo($img['name'], PATHINFO_EXTENSION);//Расширение
//    $finame = uniqid().".".$exts; //Генерация Имени.расширение
//    move_uploaded_file($img['tmp_name'],"uploads/".$finame); //Перенос
//    return $finame;

//}