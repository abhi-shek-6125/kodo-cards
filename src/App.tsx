import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

import Grid from "./components/grid";
import Search from "./components/search";
import Sort from "./components/sort";
import Pagination from "./components/pagination";
import { DATA, ITEMS_PER_PAGE } from "./constants";
import IndexRoute from "./components/indexRoute";

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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

  // set query params
  useEffect(() => {
    let searchParamObj = {};
    if (searchText) {
      searchParamObj = { ...searchParamObj, searchText };
    }
    if (sortBy) {
      searchParamObj = { ...searchParamObj, sortBy };
    }
    setSearchParams({ ...searchParams, ...searchParamObj });
  }, [searchText, sortBy]);

  // set paginated data based on search
  useEffect(() => {
    const newPaginatedData = data.slice(0 * ITEMS_PER_PAGE, 1 * ITEMS_PER_PAGE);
    setPaginatedData(newPaginatedData);
  }, [searchText]);

  useEffect(() => {
    navigate(
      `/page/${currentPage}?${searchText ? `searchText=${searchText}` : ""}`
    );
  }, [currentPage]);

  // search works on whole data
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
    setCurrentPage(1);
  };

  // sorts the data on the current page
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

  // handle page change via pagination component
  const handlePageChange = (pageNumber: number) => {
    // Update currentPage state
    setCurrentPage(() => pageNumber);
    const newPaginatedData = data.slice(
      (pageNumber - 1) * ITEMS_PER_PAGE,
      pageNumber * ITEMS_PER_PAGE
    );
    setPaginatedData(newPaginatedData);
  };

  return (
    <Routes>
      <Route path="/" element={<IndexRoute currentPage={currentPage} />} />
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
