// DOM variables

const open = document.getElementById('open');
const modalContainer = document.getElementById('modal_container');
const addBookBtn = document.getElementById('addBookBtn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const test = document.getElementById('test')
const books = document.getElementById('books')
const testShow = document.getElementById('testShow')
const bookForm = document.getElementById('bookForm')
const modal = document.getElementById("modal_container");
const showBookTitle = document.getElementById('bookLibraryTitle')
const middleText = document.getElementById('SubmitYourFirstBook')
open.addEventListener('click', () => {
    modalContainer.classList.add("show")
    modal.style.display = "block";
})
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalContainer.classList.remove("show")
    }
  }
  const default_book = [
    { title: "The One and Only Ivan", author: "Katherine Applegate", pages: 320, read: true }
  ];

let myLibrary = [];

function addBook (title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('addBookBtn').addEventListener('click', ()=> {
        let titleValue = title.value;
        let authorValue = author.value;
        let pagesValue = pages.value;
        let readValue = read.checked;
        author.value;
        pages.value;
        if (!bookForm.checkValidity()) {
          } else {
            let book = new addBook(titleValue, authorValue, pagesValue, readValue);
            myLibrary.push(book);
            updateLocalStorage();
            modalContainer.classList.remove("show")
            modal.style.display = "none";
            displayLibrary()
            bookForm.reset()
            middleText.style.display = "none";
          }
          
    });
 })
 
 function displayLibrary() {
    books.textContent = '';

  myLibrary.forEach((book, index) => {
    const bookPanel = document.createElement('div');
    bookPanel.classList.add('booksAdd');
    bookPanel.dataset.index = index;
    books.appendChild(bookPanel);

    const titleText = document.createElement('h3');
    titleText.textContent = book.title;
    bookPanel.appendChild(titleText);

    const authorText = document.createElement('p');
    authorText.textContent = "by " + book.author;
    bookPanel.appendChild(authorText);

    const pagesText = document.createElement('p');
    pagesText.textContent = book.pages + " pages";
    bookPanel.appendChild(pagesText);

    const read = document.createElement('button')
    read.classList.add(book.read ? "Unread" : "Read");
    bookPanel.appendChild(read)
    if (book.read == true){
      read.textContent = "Read";
    } else{
      read.textContent = "Not read"
    }
    read.addEventListener('click', haveRead);
    read.classList.add('readBtn');
  
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', handleRemove);
    bookPanel.appendChild(removeButton);
    removeButton.classList.add('removeBtn');

    showBookTitle.style.display = "block";
  })
}

function handleRemove(event) {
  const button = event.target;
  const libraryIndex = button.parentElement.dataset.index;

  myLibrary.splice(libraryIndex, 1);
  book.splice(libraryIndex, 1);

  displayLibrary();
  updateLocalStorage();
}

function haveRead(event) {
  const button = event.target;
  const libraryIndex = button.parentElement.dataset.index;
  if (myLibrary[libraryIndex].read == true) {
    button.classList.remove("read")
    button.classList.add("unread")
    button.textContent = "Unread"
    myLibrary[libraryIndex].read = false;
  } else {
    button.classList.remove("unread")
    button.classList.add("read")
    button.textContent = "Read"
    myLibrary[libraryIndex].read = true;
  }
}


 function showResults() {
  books.textContent = '';
  checkLocalStorage()
  book.forEach((book, index) => {
  const bookPanel = document.createElement('div');
  bookPanel.classList.add('booksAdd');
  bookPanel.dataset.index = index;
  books.appendChild(bookPanel);

  const titleText = document.createElement('h3');
  titleText.textContent = book.title;
  bookPanel.appendChild(titleText);

  const authorText = document.createElement('p');
  authorText.textContent = "by " + book.author;
  bookPanel.appendChild(authorText);

  const pagesText = document.createElement('p');
  pagesText.textContent = book.pages + " pages";
  bookPanel.appendChild(pagesText);

  const read = document.createElement('button')
  read.classList.add(book.read ? "Unread" : "Read");
  bookPanel.appendChild(read)
  if (book.read == true){
    read.textContent = "Read";
  } else{
    read.textContent = "Not read"
  }
  read.addEventListener('click', haveRead);
  read.classList.add('readBtn');

  const removeButton = document.createElement('button');
  removeButton.textContent = "Remove";
  removeButton.addEventListener('click', handleRemove);
  bookPanel.appendChild(removeButton);
  removeButton.classList.add('removeBtn');

  showBookTitle.style.display = "block";
  middleText.style.display = "none";
})
}

function checkLocalStorage() {
  if (localStorage.getItem("book")) {
    book = JSON.parse(localStorage.getItem("book"));
  } else {
    book = default_book;
  }
}


function updateLocalStorage() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
}


showResults()
checkLocalStorage()