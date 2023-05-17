import { ChangeEvent, useEffect, useState } from "react";
import "./styles.css";

interface ISearchProps {
  initialSearchText: string;
  onSearch(query: string): void;
}

const Search = ({ initialSearchText, onSearch }: ISearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <div>
      <input
        type="text"
        value={initialSearchText}
        onChange={handleChange}
        placeholder="Search by name or description"
        className="search-box"
      />
    </div>
  );
};

export default Search;
