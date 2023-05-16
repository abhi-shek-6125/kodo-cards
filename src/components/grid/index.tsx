import { IGridItem } from "../../types";
import "./styles.css";

interface IGridProps {
  items: Array<IGridItem>;
}

const Grid = ({ items }: IGridProps) => {
  return (
    <div className="grid">
      {items.map((item) => (
        <div key={`${item.name}-${item.image}`} className="card">
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Last edited: {item.dateLastEdited}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
