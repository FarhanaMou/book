// Define UI Element

let form = document.querySelector('#book_form');
let bookList = document.querySelector('#book_list');

// Class Book 

class Book{
    constructor(titel,author,isbn){
        this.titel = titel;
        this.author = author;
        this.isbn = isbn;
    }
}

// class Add Book List

class UI{
    static addBookList(book){
        let list = document.querySelector('#book_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.titel}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>    
        `
        list.appendChild(row)        
    }
    static clearFiendly(){
    document.querySelector('#titel').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';

    }
    static showAleart(massage,className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(massage));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book_form');
        container.insertBefore(div,form);

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },2000)
    }
    // remove 
    static deteteFormBook(target){
        if(target.hasAttribute('href')){
            if(confirm("Delete item?")){
                target.parentElement.parentElement.remove();
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())

            }
        }
    }
}

// Local Store

class Store{
    static getItem(){
        let books;
        if(localStorage.getItem('books')===null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
       let books= Store.getItem();
       books.push(book)
       localStorage.setItem('books',JSON.stringify(books))
    }
    static displayBook(){
        let books= Store.getItem();
        books.forEach(book=>{
            UI.addBookList(book)
        })

    }
    static removeBook(isbn){
        let books= Store.getItem();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);

            }
        })
        localStorage.setItem('books',JSON.stringify(books))

    }
}

// Add Event Listener

form.addEventListener('submit',newbook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBook())

//function

function newbook(e){
    let titel = document.querySelector('#titel').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value

    if(titel === '' || author === '' || isbn === ''){
        UI.showAleart("Place Add Your Information !","error")
    }else{
        let book = new Book(titel,author,isbn);
        UI.addBookList(book)
        UI.clearFiendly()
        UI.showAleart("Submit Compelet !","success");
        Store.addBook(book)
    }
    e.preventDefault();
}

// Remove Book

function removeBook(e){
    
    UI.deteteFormBook(e.target)
    UI.showAleart("Delete Success","success")
    e.preventDefault()
}