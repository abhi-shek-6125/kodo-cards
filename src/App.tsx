import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Grid from "./components/grid";
import Search from "./components/search";
import Sort from "./components/sort";
import Pagination from "./components/pagination";
import { IGridItem } from "./types";
import { DATA } from "./constants";

function App() {
  const [data, setData] = useState(DATA);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data from API and update state
  }, []);

  const handleSearch = (text: string) => {
    // Update searchText state
  };

  const handleSort = (option: string) => {
    // Update sortBy state
  };

  const handlePageChange = (pageNumber: number) => {
    // Update currentPage state
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
                padding: "8px 16px",
              }}
            >
              <Search onSearch={handleSearch} />
              <Sort onSort={handleSort} />
            </div>
            <Grid items={data} />
            <Pagination
              totalPages={data.length / 3}
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
            <Search onSearch={handleSearch} />
            <Sort onSort={handleSort} />
            <Grid items={data} />
            <Pagination
              totalPages={data.length / 3}
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
