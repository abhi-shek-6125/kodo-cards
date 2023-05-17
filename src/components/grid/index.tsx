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
          <div className="info">
            <h2>{item.name}</h2>
            <p className="info-content">{item.description}</p>
            <p className="info-date">
              Last edited: {new Date(item.dateLastEdited).toString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
