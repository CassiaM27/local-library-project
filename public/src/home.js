function getTotalBooksCount(books) {
  let result = 0;
  for(let i = 0; i < books.length; i++) {
    result ++
  }
  return result
}

function getTotalAccountsCount(accounts) {
  let result = 0;
  for(let i = 0; i < accounts.length; i++) {
    result ++
  }
  return result
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return acc + book.borrows.filter((notReturned) =>
      notReturned.returned === false
    ).length;
  }, 0)
}

function getMostCommonGenres(books) {
  const genres = books.reduce((result, book) => {  
    let {genre} = book
    
    if(!result[genre]) {
      result[genre] = { name: genre, count: 1 }
    } else {
      result[genre].count ++
    }
    return result
  }, {})
  
  const genresArray = Object.values(genres)
  
  return genresArray.sort(sortByPopularity).slice(0, 5)
}

function sortByPopularity(item1, item2) {
  return item2.count - item1.count
}

function getMostPopularBooks(books) {
  const mostPopular = books.reduce((result, book) => {  
    let {borrows} = book
    
    if(!result[borrows]) {
      result[borrows] = { count: borrows.length, name: book.title }
    } else {
      result[borrows] + 0
    }
    return result
  }, {})
  const mostPopularArray = Object.values(mostPopular)
  
  return mostPopularArray.sort(sortByPopularity).slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  let finalAnswer = [];
  let result = {}
  const authorInfo = authors.forEach((author) => {
    const id = author.id
    const { name: {first, last} } = author
    const authorName = `${first} ${last}`;
      
      books.forEach((book) => {
        const borrowed = book.borrows.length;
        if (book.authorId === id) {
          if (!finalAnswer.some((authorObj) => authorObj["name"] === authorName)) {
            let result = { name: authorName, count: borrowed};
              finalAnswer.push(result);
        } else {
          const foundAuthor = finalAnswer.find((authorObj) => authorObj["name"] === authorName);
          foundAuthor.count += borrowed;
        };
      };
    });
  });
  const sorted = finalAnswer.sort((authorA, authorB) => authorA.count > authorB.count ? -1 : 1);
  sorted.length = 5;
  return sorted;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};