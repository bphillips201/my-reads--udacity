import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import ListShelves from './components/ListShelves';
import SearchBooks from './components/SearchBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [
      {
        id: "currentlyReading",
        label: "Currently Reading"
      },
      {
        id: "wantToRead",
        label: "Want to Read"
      },
      {
        id: "read",
        label: "Read"
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    if (this.state.books.findIndex(l => l.id === book.id) === -1) {
      this.addToShelf(book); 
    }

    BooksAPI.update(book, shelf).then(() => {
      this.setState(() => {
        book.shelf = shelf;
      });
    });
  }

  addToShelf = (book) => {
    this.setState(state => ({
      books: state.books.concat([ book ])
    }))
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
           <SearchBooks
            library={this.state.books}
            updateShelf={this.updateShelf}
            addToShelf={this.addToShelf}
          /> 
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListShelves
                  shelves={this.state.shelves}
                  library={this.state.books}
                  updateShelf={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
