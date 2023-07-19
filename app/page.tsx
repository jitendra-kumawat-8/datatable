"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import DataTable from "../components/DataTable";

const DataContext = createContext<any>(null);

const Home: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my.api.mockaroo.com/data.json?key=94929a20"
        );
        const tempData: any[] = await response.json();
        setData(tempData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sortColumn) {
      data.sort((a: any, b: any) => {
        if (sortColumn === "timestamp") {
          const aArray = a[sortColumn].split(" ");
          const bArray = b[sortColumn].split(" ");
          const aMinutes =
            aArray[1] === "minutes"
              ? parseInt(aArray[0])
              : parseInt(aArray[0]) * 60;
          const bMinutes =
            bArray[1] === "minutes"
              ? parseInt(bArray[0])
              : parseInt(bArray[0]) * 60;

          return sortDirection === "asc"
            ? aMinutes - bMinutes
            : bMinutes - aMinutes;
        } else {
          return sortDirection === "asc"
            ? a[sortColumn].localeCompare(b[sortColumn])
            : b[sortColumn].localeCompare(a[sortColumn]);
        }
      });
    }

    const filteredData = data.filter((row: any) => {
      return Object.values(row).some((value: any) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
    const currentPage = filteredData.slice(
      pageNumber * rowsPerPage,
      pageNumber * rowsPerPage + rowsPerPage
    );
    setPage(currentPage);
  }, [data, searchValue, sortColumn, sortDirection, pageNumber, rowsPerPage]);

  return (
    <DataContext.Provider
      value={{
        rowsPerPage,
        setRowsPerPage,
        sortColumn,
        setSortColumn,
        sortDirection,
        setSortDirection,
        pageNumber,
        setPageNumber,
        totalPages,
        setSearchValue,
      }}
    >
      <ChakraProvider>
        {data.length !== 0 && (
          <div className="table-container">
            <DataTable
              caption="Bookings"
              headers={Object.keys(data[0])}
              page={page}
              sortable
              pagination
            />
          </div>
        )}
      </ChakraProvider>
    </DataContext.Provider>
  );
};

const useDataContext = () => useContext(DataContext);

export default Home;
export { DataContext, useDataContext };
