import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

import Grid from "./components/grid";
import Search from "./components/search";
import Sort from "./components/sort";
import Pagination from "./components/pagination";
import { DATA, ITEMS_PER_PAGE } from "./constants";

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(DATA);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(() =>
    data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  );

  useEffect(() => {
    // Get the value of a specific query parameter
    const sortQueryValue = searchParams.get("sortBy");
    const searchQueryValue = searchParams.get("searchText");
    if (sortQueryValue) {
      setSortBy(sortQueryValue);
      handleSort(sortQueryValue);
    }
    if (searchQueryValue) {
      setSearchText(searchQueryValue);
      handleSearch(searchQueryValue);
    }
  }, []);

  useEffect(() => {
    if (searchText || sortBy) {
      navigate(
        `/page/${currentPage}?${
          searchText !== "" ? `searchText=${searchText}` : ""
        }${sortBy !== "" ? `&&sortBy=${sortBy}` : ""}`
      );
    }
  }, [searchText, sortBy]);

  useEffect(() => {
    const newPaginatedData = data.slice(0 * ITEMS_PER_PAGE, 1 * ITEMS_PER_PAGE);
    setPaginatedData(newPaginatedData);
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    // Update searchText state
    const isExactMatchQuery =
      text.charAt(0) === text.charAt(text.length - 1) && text.charAt(0) === '"';
    if (isExactMatchQuery) {
      const newData = DATA.filter((item) => {
        return `${item.name} ${item.description}`.includes(
          text.slice(1, text.length - 1)
        );
      });

      setData(newData);
      return;
    }
    const newData = DATA.filter((item) => {
      return `${item.name} ${item.description}`
        .toLowerCase()
        .includes(text.toLowerCase());
    });
    setData(newData);
  };

  const handleSort = (option: string) => {
    if (option === "") {
      return;
    }
    setSortBy(option);
    // Update sortBy state
    if (option === "name") {
      const newData = paginatedData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPaginatedData(newData);
      return;
    }
    if (option === "dateLastEdited") {
      const newData = paginatedData.sort((a, b) => {
        const dateA = new Date(a.dateLastEdited).getTime();
        const dateB = new Date(b.dateLastEdited).getTime();

        if (isNaN(dateA) || isNaN(dateB)) {
          // Handle invalid dates
          return 0; // Return 0 to keep the order unchanged
        }

        return dateB - dateA;
      });
      setPaginatedData(newData);
      return;
    }
  };

  const handlePageChange = (pageNumber: number) => {
    // Update currentPage state
    setCurrentPage((prev) => pageNumber + 1);
    const newPaginatedData = data.slice(
      (pageNumber - 1) * ITEMS_PER_PAGE,
      pageNumber * ITEMS_PER_PAGE
    );
    setPaginatedData(newPaginatedData);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "24px 60px",
              }}
            >
              <Search onSearch={handleSearch} initialSearchText={searchText} />
              <Sort onSort={handleSort} initialSortOption={sortBy} />
            </div>
            <Grid items={paginatedData} />
            <Pagination
              totalPages={Math.ceil(data.length / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </>
        }
      />
      <Route
        path="/page/:pageNumber"
        element={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "24px 60px",
              }}
            >
              <Search onSearch={handleSearch} initialSearchText={searchText} />
              <Sort onSort={handleSort} initialSortOption={sortBy} />
            </div>
            <Grid items={paginatedData} />
            <Pagination
              totalPages={Math.ceil(data.length / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </>
        }
      />
    </Routes>
  );
}

export default App;
