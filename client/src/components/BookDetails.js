import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ id }) => {
  const { data, error, loading } = useQuery(getBookQuery, {
    variables: { id }
  });

  const renderDetails = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { book } = data;

    if (!book) return <div>No book selected...</div>;

    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
          {book.author.books.map(item => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  };

  return <div id="book-details">{renderDetails()}</div>;
};

export default BookDetails;
