import { ChangeEvent, useState } from "react";
import "./styles.css";

interface ISearchProps {
  onSearch(query: string): void;
}

const Search = ({ onSearch }: ISearchProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setText(searchText);
    onSearch(searchText);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Search by name or description"
        className="search-box"
      />
    </div>
  );
};

export default Search;
