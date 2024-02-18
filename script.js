const myLibrary = [];

const sampleBook1 = new Book("book1", "author1", "1", false);
const sampleBook2 = new Book("book2", "author2", "2", false);
const sampleBook3 = new Book("book3", "author3", "3", false);
const sampleBook4 = new Book("book4", "author4", "4", false);

myLibrary.push(sampleBook1);
myLibrary.push(sampleBook2);
myLibrary.push(sampleBook3);
myLibrary.push(sampleBook4);

const bookDisplayGrid = document.querySelector('#book-grid');

const addBookButton = document.querySelector('#add-book');
const modalTest = document.querySelector('dialog');
const modalCloseButton = document.querySelector('dialog button');

addBookButton.addEventListener('click', () => {
    modalTest.showModal();
})

modalCloseButton.addEventListener('click', () => {
    modalTest.close();
})



function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.info = function() {
        const readString = isRead ? "already read." : "not read yet.";
        return title + " by " + author + ", " + pageCount + " pages, " + readString;
    }
}


function addBookToLibrary() {
    const title = prompt("Enter the title of the book.");
    const author = prompt("Enter the author.");
    const pageCount = prompt("Enter the number of pages.");
    const isRead = prompt("Have you finished reading it?");

    const userBook = new Book(title, author, pageCount, isRead);

    myLibrary.push(userBook);
}

function displayLibrary() {
    myLibrary.forEach((book) => {
        addBookToDisplay(book);
    });
}

function addBookToDisplay(book) {
    const bookCardHTML = createBookCardHTML(book);
    bookDisplayGrid.insertAdjacentHTML('beforeend', bookCardHTML);
}

function createBookCardHTML(book) {
    return `
    <div class="book-card">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-page-count">${book.pageCount}</div>
        <div class="book-is-read">${book.isRead}</div>
    </div>`;
}