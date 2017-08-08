import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
    maxResults: 20
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    
    if (query.length) {
      this.searchBooks(query);
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      if (typeof(books) === 'undefined' || books.error || query.length === 0) {
        this.setState({ searchResults: [] })
      } else {
        this.setState({ searchResults: books })
      }
    })
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <Book
                key={book.id}
                book={book}
                updateShelf={this.props.updateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;