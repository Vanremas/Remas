async function getBooks(){
    let res = await fetch ('http://api.novichkov.ru/books');
    let books = await res.json();
    document.querySelector('.card-list').innerHTML = '';
    document.querySelector('#book_container').innerHTML = '';

    books.forEach((book) => {
        document.querySelector('.card-list').innerHTML +=`
        <div class="card">
                
                <h1 class="ch1">${book.title}</h1>
                <a class="ca1" onclick="searchAuthors('${book.Author}')">${book.Author}</a>
                <img src="../uploads/${book.img}" id="imgall">
                 <button id="up" onclick="upBookForm('${book.idBook}', '${book.Author}', '${book.title}', '${book.genre}', '${book.year}', '${book.desc}')">✎</button>
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
                <button id="del" onclick="delBook(${book.idBook}   )">-</button>
                
            </div>`
    });
}
async function upBookForm(id,author, title, genre, year, desc ){
    document.getElementById('forma').style.display = 'flex'
    document.querySelector('#forma').innerHTML += `
        <div id='form'>
            <button id="close-form" onclick="closeWin()">Назад</button>
            <h3>Введите новые данные в поле чтобы изменить:</h3>
            <input id="tittle" placeholder="Название" class="foInp" value="${title}"></br>
            <input id="author" placeholder="Автор" class="foInp" value="${author}"></br>
            <input id="year" placeholder="Год(****)" class="foInp" value="${year}"></br>
            <textarea id="description" placeholder="Описание" class="foInp" >${desc}</textarea></br>
           <input id="genre" placeholder="Жанр (Из имеющихся) " class="foInp" value="${genre}"></br>
            <input type="file" id="img"></br>
            <button id="done_button" onclick="upBook(${id})">Подтвердить</button>
        </div>
    `;
}

async function upBook(id){
    let gen1='Фэнтези';
    let gen2='Повести';
    let gen3='Ужасы';
    let gen4='Детектив';
    let gen5 = '';
    let tittle = document.getElementById('tittle').value;
    let author = document.getElementById('author').value;
    let date = document.getElementById('year').value;
    let description = document.getElementById('description').value;
    let genre = document.getElementById('genre').value;
    let img = document.getElementById('img').files[0];


if( genre === gen1 ||genre === gen2 || genre === gen3 || genre === gen4 || genre === gen5){
    let formdata = new FormData();
    formdata.append('id', id);
    formdata.append('tittle', tittle);
    formdata.append('author', author);

    formdata.append('year', date);
    formdata.append('description', description);
    formdata.append('genre', genre);
    formdata.append('img', img);

    let res = await fetch(`http://api.novichkov.ru/books/book/${id}`, {
        method: 'POST',
        body: formdata
    });

    let data = await res.json();

    if(data.status === true){
        alert('Успешно!')
        await getBooks();
        document.getElementById('forma').style.display = 'none';
        document.querySelector('#form').remove();
    }
} else{
    alert('Жанр введен не верно!')

}

}

async function delBook(id) {
    let res = await fetch(`http://api.novichkov.ru/books/book/${id}`, {
        method: 'DELETE'
    });
    let data = await res.json();
    if(data.status === true){
        alert('Книга Удалена');
        await getBooks();
    }

}

async function exit(){
    window.location.assign("../index.html");
}

async function getBook(idBook){

    let res = await fetch (`http://api.novichkov.ru/books/book/${idBook}`);

    let boboks = await res.json();

    document.querySelector('.card-list').innerHTML = '';
    document.querySelector('#book_container').innerHTML = '';
    console.log(boboks.title);

    document.querySelector('#book_container').innerHTML += `
<div id="card-one-book">
        
        <h2>${boboks.title}</h2>
        <p id="author">${boboks.author}</p>
        <p class="type">Жанр: <span>${boboks.genre}</span></p>
                <img src="../uploads/${boboks.img}" id="bookimg">
            
            <div id="full_discription">
                
                
           
                
       
                <p class="type">Дата: <span>${boboks.year}</span></p>
                <h3>Описание</h3>
                <p id="anno">${boboks.desc}</p>
                <button type="submit" onclick="getBooks()" id="close-form">Вернутся</button>
            </div>
        </div>`


}


async function searchAuthors(Aut){


    let res = await fetch ('http://api.novichkov.ru/books');
    let books = await res.json();

    document.querySelector('.card-list').innerHTML = '';
    document.querySelector('#book_container').innerHTML = '';
    books.forEach((book) => {

        AuthorNameSearch = book.Author.indexOf(Aut);

        FindAuthorName = Aut.indexOf(book.Author);

        if(FindAuthorName != -1 || AuthorNameSearch != -1){
            document.querySelector('.card-list').innerHTML +=`
             <div class="card">
                
                <h1 class="ch1">${book.title}</h1>
                <a class="ca1" onclick="searchAuthors('${book.Author}')">${book.Author}</a>
                <img src="../uploads/${book.img}" id="imgall">
                <button id="up" onclick="upBookForm('${book.idBook}', '${book.Author}', '${book.title}', '${book.genre}', '${book.year}', '${book.desc}')">✎</button>
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
               <button id="del" onclick="delBook(${book.idBook})">-</button>
            </div>`
        }
    })
}

async function search(){
    let searchRes = document.getElementById('searchbar').value;

    let res = await fetch ('http://api.novichkov.ru/books');
    let books = await res.json();

    document.querySelector('.card-list').innerHTML = '';
    document.querySelector('#book_container').innerHTML = '';
    console.log(searchRes);
    books.forEach((book) => {
        BookNameSearch = book.title.indexOf(searchRes);
        AuthorNameSearch = book.Author.indexOf(searchRes);
        FindBookTitle = searchRes.indexOf(book.title);
        FindAuthorName = searchRes.indexOf(book.Author);

        if(FindAuthorName != -1 || FindBookTitle != -1 || BookNameSearch != -1 || AuthorNameSearch != -1){
            document.querySelector('.card-list').innerHTML +=`
             <div class="card">
                
                <h1 class="ch1">${book.title}</h1>
                <a class="ca1" onclick="searchAuthors('${book.Author}')">${book.Author}</a>
                <img src="../uploads/${book.img}" id="imgall">
                <button id="up" onclick="upBookForm('${book.idBook}', '${book.Author}', '${book.title}', '${book.genre}', '${book.year}', '${book.desc}')">✎</button>
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
                <button id="del" onclick="delBook(${book.idBook})">-</button>
            </div>`
        }
    })

    searchRes = 0;
}



async function getBBGenre(id) {
    let res = await fetch(`http://api.novichkov.ru/books/genre/${id}`);
    let books = await res.json();
    document.querySelector('.card-list').innerHTML = '';
    document.querySelector('#book_container').innerHTML = '';

    books.forEach((book) => {

        document.querySelector('.card-list').innerHTML += `
        <div class="card">
                
                <h1 class="ch1">${book.title}</h1>
                <a class="ca1" onclick="searchAuthors('${book.Author}')">${book.Author}</a>
                <img src="../uploads/${book.img}" id="imgall">
                
              <button id="up" onclick="upBookForm('${book.idBook}', '${book.Author}', '${book.title}', '${book.genre}', '${book.year}', '${book.desc}')">✎</button>
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
                <button id="del" onclick="delBook(${book.idBook})">-</button>
            </div>`
    });

}


async function BookForm(genre){
    console.log(genre)
    document.getElementById('forma').style.display = 'flex'
    document.querySelector('#forma').innerHTML += `
        <div id='form'>
     
            <button id="close-form" onclick="closeWin()">Назад</button>
            <h3>Добавить книгу</h3>
            <input id="tittle" placeholder="Название книги" class="foInp"></br>
            <input id="author" placeholder="Автор" class="foInp"></br>
            <input id="year" placeholder="Год(****)" class="foInp"></br>
            <input id="description" placeholder="Описание" class="foInp"></br>
            <input id="genre" value="${genre}" readonly class="foInp1">
            <input type="file" id="img" ></br>
            <button id="done_button" onclick="addBook()">Подтвердить</button>
        </div>
    `;

}
async function addBook(){
    let tittle = document.getElementById('tittle').value;
    let author = document.getElementById('author').value;
    let year = document.getElementById('year').value;
    let description = document.getElementById('description').value;
    let genre = document.getElementById('genre').value;
    let img = document.getElementById('img').files[0];
if (!tittle || !author || !year || !description || !genre || !img){
    alert('Не все поля заполнены или отсутствует изображение!')
} else {
    let formdata = new FormData();
    formdata.append('tittle', tittle);
    formdata.append('author', author);
    formdata.append('year', year);
    formdata.append('description', description);
    formdata.append('genre', genre);
    formdata.append('img', img);

    let res = await fetch('http://api.novichkov.ru/books/book', {
        method: 'POST',
        body: formdata
    });

    let data = await res.json();

    if(data.status === true){
        alert('Успешно!')
        await getBooks();

        document.getElementById('forma').style.display = 'none';
        document.querySelector('#form').remove();
    } else{
        alert('Такая книга уже есть');
    }

}



}



async function closeWin(){
    document.getElementById('forma').style.display = 'none';
    document.querySelector('#form').remove();
}


getBooks();


//жанры

let Fan = document.getElementById("Fan");
Fan.addEventListener("click", (event) => {

    getBBGenre(1);



})
let Pov = document.getElementById("Pov");
Pov.addEventListener("click", (event) => {

    getBBGenre(2);



})
let Ujas= document.getElementById("Ujas");
Ujas.addEventListener("click", (event) => {

    getBBGenre(3);



})
let detec = document.getElementById("detec");
detec.addEventListener("click", (event) => {

    getBBGenre(4);



})
let all = document.getElementById("all");
all.addEventListener("click", (event) => {

    getBooks();



})

//Добавить по жанру

let Fn = document.getElementById("Fn");
Fn.addEventListener("click", (event) => {
let a = 'Фэнтези';
    BookForm(a);



})
let Pv = document.getElementById("Pv");
Pv.addEventListener("click", (event) => {
    let a ='Повесть';
    BookForm(a);



})
let Us= document.getElementById("Us");
Us.addEventListener("click", (event) => {
    let a ='Ужасы';
    BookForm(a);



})
let dc = document.getElementById("dc");
dc.addEventListener("click", (event) => {
    let a ='Детектив';
    BookForm(a);


})