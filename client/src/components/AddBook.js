import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

const AddBook = () => {
  const [state, setState] = useState({ name: "", genre: "", authorId: "" });
  const { data, error, loading } = useQuery(getAuthorsQuery);
  const [addNewBook] = useMutation(addBookMutation);

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option disabled>Error :(</option>;

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const submitForm = async e => {
    const { name, genre, authorId } = state;

    e.preventDefault();

    addNewBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={e => setState({ ...state, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={e => setState({ ...state, genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={e => setState({ ...state, authorId: e.target.value })}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
