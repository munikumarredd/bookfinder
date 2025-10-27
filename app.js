import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch books from Open Library API
  const searchBooks = async () => {
    if (query.trim() === "") {
      alert("Please enter a book title");
      return;
    }

    setLoading(true);
    const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
    const data = await response.json();
    setBooks(data.docs.slice(0, 10)); // show top 10 books
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>📚 Book Finder</h1>

      <div className="search-box">
        <input
          type="text"
          value={query}
          placeholder="Enter book title..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="results">
          {books.length === 0 ? (
            <p>No results found.</p>
          ) : (
            books.map((book, index) => {
              const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/100x150?text=No+Cover";

              return (
                <div className="book" key={index}>
                  <img src={coverUrl} alt="Book Cover" />
                  <div>
                    <h3>{book.title}</h3>
                    <p>
                      <strong>Author:</strong>{" "}
                      {book.author_name?.join(", ") || "Unknown"}
                    </p>
                    <p>
                      <strong>First Published:</strong>{" "}
                      {book.first_publish_year || "N/A"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default App;
