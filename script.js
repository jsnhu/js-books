const myLibrary = [];

initSampleBooks();

const bookDisplayGrid = document.querySelector('#book-grid');

const addBookButton = document.querySelector('#add-book');
const addBookDialog = document.querySelector('.add-book-dialog');
const addBookForm = document.querySelector('#add-book-form');

bookDisplayGrid.addEventListener('click', (e) => {    
    if (e.target.classList.contains('delete-card')) {
        const targetCard = e.target.parentNode.parentNode;

        let cardIterator = targetCard.nextElementSibling;

        while (cardIterator) {
            cardIterator.dataset.index = (Number(cardIterator.dataset.index) - 1).toString();
            cardIterator = cardIterator.nextElementSibling;
        }

        const removeIndex = Number(targetCard.dataset.index);
        myLibrary.splice(removeIndex, 1);
        targetCard.remove();
    }
});

bookDisplayGrid.addEventListener('click', (e) => {  
    const isReadButton = e.target.closest('.book-is-read');  
    if (isReadButton) {
        const bookCard = isReadButton.parentNode.parentNode;

        const parentNode = isReadButton.parentNode;
        const book = myLibrary[Number(bookCard.dataset.index)];
        book.toggleIsRead();
        isReadButton.remove();
        
        parentNode.insertAdjacentHTML("beforeend", createIsReadHTML(book.isRead));

    }
});

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
    addBookToDisplay(book, myLibrary.length-1);
    addBookForm.reset();
});

displayLibrary();


const dialogCloseButton = document.querySelector('#close-dialog');

dialogCloseButton.addEventListener('click', () => {
    addBookDialog.close();
})

// functions


function initSampleBooks() {
    const sampleBook1 = new Book("How I Got From Here to There", "Stefan Elbridge", "355", false);
    const sampleBook2 = new Book("How I Got From There to Here", "Jon Elbridge", "332", false);
    const sampleBook3 = new Book("When I Learned Where From Why", "Janet Cynthia", "112", true);

    myLibrary.push(sampleBook1);
    myLibrary.push(sampleBook2);
    myLibrary.push(sampleBook3);
}

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

Book.prototype.toggleIsRead = function () {
    this.isRead = !this.isRead;
}

function displayLibrary() {
    bookDisplayGrid.replaceChildren();

    for (i=0; i<myLibrary.length; i++) {
        addBookToDisplay(myLibrary[i], i)
    }
}

function addBookToDisplay(book, index) {
    const bookCardHTML = createBookCardHTML(book, index);
    bookDisplayGrid.insertAdjacentHTML('beforeend', bookCardHTML);
}

function createBookCardHTML(book, index) {
    return `
    <div class="book-card" data-index='${index}'>
        <div class="book-card-left">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-page-count">${book.pageCount} pages</div>
            ${createIsReadHTML(book.isRead)}
        </div>
        <div class="book-card-right">
            <span class="material-icons delete-card">delete</span>
        </div>
    </div>`;

}

function createIsReadHTML(isRead) {
    let completionIconString = 'radio_button_unchecked';
    let completionStatusString = 'Unread';
    let completionStatusClass = 'unread-book';

    if (isRead) {
        completionIconString = 'done';
        completionStatusString = 'Completed';
        completionStatusClass = 'completed-book';
    }

    return `
        <div class="book-is-read ${completionStatusClass}">
            <span class="material-icons">${completionIconString}</span>
            ${completionStatusString}
        </div>`;
}