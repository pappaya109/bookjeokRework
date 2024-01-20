const connection = require('./../config/database');
const axios = require('axios');
const { executeQuery } = require('./reviewTagUtils');

const postBook = async (isbn, callback) => {
  const query = 'INSERT INTO t_book (book_name, publisher, author, published_at, isbn, book_img, likes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const response = await searchBookByISBN(isbn);
  console.log(response)
  connection.query(
    query,
    [
      response.book_name,
      response.publisher,
      response.author,
      response.published_at,
      response.isbn,
      response.book_img,
      response.likes,
      response.created_at
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
        return null;
      }
      console.log(result)
      const newBookId = result.insertId;
      callback(null, newBookId);
      return (newBookId);
    }
  );
};

const checkBookExist = (isbn, callback) => {
  const query = 'SELECT * FROM t_book WHERE isbn = ?';
  connection.query(query, isbn, (err, row) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return ;
    }
    if (row[0] === undefined) {
      callback(null, -1)
      return ;
    }
    console.log(row)
    const book_idx = row[0].book_idx;
    callback(null, book_idx);
  })
}

const getBooksExternal = async (title, size, target) => {
  if (title === undefined)
    return ;
  try { 
    const response = await axios.get('https://dapi.kakao.com/v3/search/book', {
      params: {
        query: title,
        size: size || '10',
        target: target || 'title'
      },
      headers: {
        'Authorization': 'KakaoAK 99b1471bee6930214e34e002f71bfa06',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    return ({
      data: response.data,
      err: null
    });
  } catch (err) {
    console.log(err);
    return new Error ({
      data: null,
      err: err
    });
  }
}

const searchBookByISBN = async (isbn) => {
  if (isbn === undefined)
    return ;
  const isbnKey = isbn.split(' ')[0];
  try {
    const response = await axios.get('https://dapi.kakao.com/v3/search/book', {
      params: {
        query: isbnKey,
        size: 1,
        target: 'isbn'
      },
      headers: {
        'Authorization': 'KakaoAK 99b1471bee6930214e34e002f71bfa06',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    const result = response.data;
    return ({
        book_name: result.documents[0].title,
        publisher: result.documents[0].publisher,
        author: result.documents[0].authors[0],
        published_at: result.documents[0].datetime,
        isbn: isbn,
        book_img: result.documents[0].thumbnail,
        likes: 0,
        created_at: new Date()
    });
  } catch (err) {
    return ({
      data: null,
      err: err
    });
  }
}

const getBooksByTag = async (tags, callback) => {
  let result = [];
  const query = "SELECT t.tag_idx, b.book_idx, b.book_name, b.isbn, b.book_img FROM t_tag t INNER JOIN t_booktag bt ON t.tag_idx = bt.tag_idx INNER JOIN t_book b ON bt.book_idx = b.book_idx WHERE t.tag_idx = ?"
  try {
    for (const tag of tags) {
      const tag_idx = tag.tag_idx;
      const res = await executeQuery(query, tag_idx);
      if (res[0] !== undefined)
        result.push(res)
    }
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

const getBookByTag = async (tag_idx, callback) => {
  const query = "SELECT t.tag_idx, b.book_idx, b.book_name, b.isbn, b.book_img FROM t_tag t INNER JOIN t_booktag bt ON t.tag_idx = bt.tag_idx INNER JOIN t_book b ON bt.book_idx = b.book_idx WHERE t.tag_idx = ?"
  try {
      const res = await executeQuery(query, tag_idx);
      callback(null, res);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  checkBookExist,
  getBooksExternal,
  searchBookByISBN,
  postBook,
  getBooksByTag,
  getBookByTag
}