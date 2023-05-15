import { ChangeEvent, useState } from "react";

interface ISortProps {
  onSort(sortBy: string): void;
}

const Sort = ({ onSort }: ISortProps) => {
  const [option, setOption] = useState("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setOption(sortOption);
    onSort(sortOption);
  };

  return (
    <div>
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={option} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="name">Name</option>
        <option value="dateLastEdited">Date last edited</option>
      </select>
    </div>
  );
};

export default Sort;
