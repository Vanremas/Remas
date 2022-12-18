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
                <img src="uploads/${book.img}" id="imgall">
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
            </div>`
    });
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
                <img src="uploads/${boboks.img}" id="bookimg">
            
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
                <img src="uploads/${book.img}" id="imgall">
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
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
                <img src="uploads/${book.img}" id="imgall">
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
            </div>`
        }
    })

    searchRes = 0;
}

async function AdminForm(){
    document.getElementById('forma').style.display = 'flex';
    document.querySelector('#forma').innerHTML += `
        <div id='form'>
            <button id="close-form" onclick="closeWin()">Назад</button>
            <h3>Вход</h3>
            <input id="login" name="login" placeholder="Логин" class="foInp"></br>
            <input type="password" name="password" id="password" placeholder="Пароль" class="foInp"></br>
            <button id="done_button" onclick="Admin()">Подтвердить</button>
        </div>
    `;
}

async function Admin(){
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;


        let formdata = new FormData();
        formdata.append('login', login);
        formdata.append('password', password);


        let res = await fetch('http://api.novichkov.ru/books/admin', {
            method: 'POST',
            body: formdata
        });

        let data = await res.json();

        if(data.status === true){

            window.location.assign("./admin/index.html");

            document.getElementById('forma').style.display = 'none';
            document.querySelector('#form').remove();
        }

    if(data.status === false){
alert('Не верный логин или пароль!')



    }



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
                <img src="uploads/${book.img}" id="imgall">
                
               <button type="submit" id="butPod" onclick="getBook(${book.idBook})">Подробнее</button>
            </div>`
    });
    if (books.status === false){
        alert('Книги в данном жанре отсутсвуют');
    }
}
async function closeWin(){
    document.getElementById('forma').style.display = 'none';
    document.querySelector('#form').remove();
}

getBooks();


//Вывод по жанрам

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

