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
const addBookDialog = document.querySelector('.add-book-dialog');
const addBookForm = document.querySelector('#add-book-form');


addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(addBookForm);
    const formDataJSON = {};
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const book = createBookFromFormJSON(formDataJSON);
    myLibrary.push(book);
    addBookToDisplay(book);

});

function createBookFromFormJSON(formDataJSON) {
    const isRead = "add-book-is-read" in formDataJSON ? true : false;  
    return new Book(    formDataJSON['add-book-title'],
                        formDataJSON['add-book-author'],
                        formDataJSON['add-book-page-count'],
                        isRead);
}

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
    let completionIconString = 'circle';
    let completionStatusString = 'Unread';
    if (book.isRead) {
        completionIconString = 'done';
        completionStatusString = 'Completed';
    }

    return `
    <div class="book-card">
        <div class="book-card-left">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-page-count">${book.pageCount} pages</div>
            <div class="book-is-read">
                <span class="material-icons">${completionIconString}</span>
                ${completionStatusString}
            </div>
        </div>
        <div class="book-card-right">
            <span class="material-icons">delete</span>
        </div>
    </div>`;

}