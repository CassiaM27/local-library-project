function findAuthorById(authors, id) {
  for(let i = 0; i < authors.length; i++) {
    if(authors[i].id === id) {
      return authors[i];
    };
  };
};

function findBookById(books, id) {
  for(let i = 0; i < books.length; i++) {
    if(books[i].id === id) {
      return books[i];
    };
  };
};

function partitionBooksByBorrowedStatus(books) {
  const checkedInBooks = [];
  const checkedOutBooks = [];
    books.filter((book) => {
    const borrowed = book.borrows;
    return borrowed.every((borrow) => {
      if(borrow.returned === true) {
        checkedInBooks.push(book);
      } else {
        checkedOutBooks.push(book);
      };
    });
  });
  const result = [checkedOutBooks, checkedInBooks];
  return result;
}

function getBorrowersForBook(book, accounts) {
  const result = book.borrows.map((book) => {
    let account = findAuthorById(accounts, book.id);
    account.returned = book.returned;
  return account;
  }).slice(0, 10);
  return result;
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};