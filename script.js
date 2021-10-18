let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function clearTable(){

    let tableData = document.querySelectorAll(".data").forEach(e => e.remove());   
}

function showLibrary() {
    getLocalStorage();
    for (var i = 0; i < myLibrary.length; i++) {
        let row = table.insertRow();
        row.className = `data ${i}`;
        
        let cellTitle = row.insertCell().textContent = myLibrary[i].title;
        let cellAuthor = row.insertCell().textContent = myLibrary[i].author;
        let cellPages = row.insertCell().textContent = myLibrary[i].pages;
        let cellRead;
            if(myLibrary[i].read === true) {
                cellRead = row.insertCell().innerHTML =  `<input class='status' id='${i}' checked='true'  type="checkbox" />`;  
            } else {
                cellRead = row.insertCell().innerHTML =  `<input class='status' id='${i}' type="checkbox" />`;
                cellRead.checked = false;
            } 
        let removeButton = row.insertCell().innerHTML = `<button class="remove" value='${i}' >Remove</button>`;

    }
 
}

function changeReadStatus(book) {
    console.log('read')
    if (myLibrary[book].read === true){
        myLibrary[book].read = false;
    } else {
        myLibrary[book].read = true;
    }
}

function removeFromList(book) {
    console.log('remove');
    myLibrary.splice(book, 1);
    clearTable();
    showLibrary();

}

const table = document.querySelector("table");

table.addEventListener('click', (e) => {
    const currentBook = e.target;
    if(e.target.classList.contains("remove")) {
        removeFromList(e.target.value);
    } else if (e.target.classList.contains('status')) {
        changeReadStatus(e.target.id);
    }
    updateLocalStorage();
})

const form = document.getElementById("form");
form.style.display = "none";
const addButton = document.querySelector('.add');
addButton.addEventListener("click", function addBookToLibrary() {
    let formSetting = form.style.display;
    if (formSetting === "none") {
        form.style.display = "block";
        addButton.textContent = "Close form";
    } else if (formSetting === "block") {
        form.style.display = "none";
        addButton.textContent = "Add to library";
    }

    const submitButton = document.getElementById("form-submit");
    submitButton.addEventListener("click", function submitBookData() {
        clearTable();
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let read = document.getElementById("read").checked;

        if (title === ''){
            alert("Please input valid book");
        } else {

            if (myLibrary.filter(function(e) { return e.title === title; }).length > 0) {
                alert("Duplicate book");
            } else {
                let book = new Book(title, author, pages, read);
                myLibrary.push(book);
                updateLocalStorage();
            }
        }
        showLibrary();      
        document.forms[0].reset();
    })
    
})

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
   
  }
  function getLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
      myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } 
  }
showLibrary();