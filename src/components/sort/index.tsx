import { ChangeEvent } from "react";
import "./styles.css";

interface ISortProps {
  initialSortOption: string;
  onSort(sortBy: string): void;
}

const Sort = ({ initialSortOption, onSort }: ISortProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    onSort(sortOption);
  };

  return (
    <div>
      <label htmlFor="sort-by" className="sort-label">
        Sort by : &nbsp;
      </label>
      <select
        id="sort-by"
        value={initialSortOption}
        onChange={handleChange}
        className="sort-dropdown"
      >
        <option value="">Select an option</option>
        <option value="name">Name</option>
        <option value="dateLastEdited">Date last edited</option>
      </select>
    </div>
  );
};

export default Sort;
