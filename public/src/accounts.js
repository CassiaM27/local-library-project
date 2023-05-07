function findAccountById(accounts, id) {
  let result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
};

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for(let book of books) {
    for(let borrowEntries of book.borrows) {
      if(borrowEntries.id === account.id) {
        result ++;
      };
    };
  };
  return result;
};


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const checkedOutBooks = books.filter((book) => {
    const borrowed = book.borrows;
    const isBorrowed = borrowed.some((borrow) => borrow.id === accountId && !borrow.returned);
    return isBorrowed;
  });
  const result = checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
  return result;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount
};