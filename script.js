const myLibrary = [];


function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.info = function() {
        const readString = isRead ? "already read." : "not read yet.";
        return title + " by " + author + ", " + numPages + " pages, " + readString;
    }
}

bookDisplayGrid = document.querySelector('#book-grid');

function addBookToLibrary() {
    const title = prompt("Enter the title of the book.");
    const author = prompt("Enter the author.");
    const numPages = prompt("Enter the number of pages.");
    const isRead = prompt("Have you finished reading it?");

    const userBook = new Book(title, author, numPages, isRead);

    myLibrary.push(userBook);
}

function displayLibrary() {
    myLibrary.forEach((book) => {
        addBookToDisplay(book);
    });
}

function addBookToDisplay(book) {
    const bookCard = createBookCard(book);
    bookDisplayGrid.appendChild(bookCard);
}

function createBookCard(book) {
    
}