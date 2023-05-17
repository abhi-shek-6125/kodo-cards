import { Link } from "react-router-dom";
import "./styles.css";

interface IPaginationProps {
  totalPages: number;
  onPageChange(nextPageNumber: number): void;
  currentPage: number;
}

const Pagination = ({
  totalPages,
  onPageChange,
  currentPage,
}: IPaginationProps) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (event: React.MouseEvent<HTMLElement>) => {
    const pageNumber = Number((event.target as HTMLElement).textContent);
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination-wrapper">
      {pageNumbers.map((pageNumber) => (
        <Link
          to={`/page/${pageNumber}`}
          key={pageNumber}
          onClick={handlePageChange}
          className={`${
            currentPage === pageNumber ? "active" : ""
          } pagination-button`}
        >
          {pageNumber}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
