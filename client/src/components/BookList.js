import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { data, error, loading } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;
  return (
    <div>
      <ul id="book-list">
        {books.map(b => (
          <li onClick={e => setSelectedBook(b.id)} key={b.id}>
            {b.name}
          </li>
        ))}
      </ul>
      <BookDetails id={selectedBook} />
    </div>
  );
};

export default BookList;
