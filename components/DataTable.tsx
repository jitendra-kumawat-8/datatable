import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Flex,
  IconButton,
  Input,
  Select,
  Badge,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import "../app/globals.css";
import { DataContext, useDataContext } from "@/app/page";

interface DataTableProps {
  caption?: string;
  headers: string[];
  page: (string | JSX.Element)[][];
  sortable?: boolean;
  pagination?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  caption,
  headers,
  page,
  sortable,
  pagination,
}) => {
  const dataContext = useDataContext();

  const {
    sortColumn,
    setSortColumn,
    setSortDirection,
    sortDirection,
    pageNumber,
    setPageNumber,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
  } = dataContext;

  const handleHeaderClick = (column: string) => {
    if (sortable) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    setInputValue(value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputValue < 1
        ? setPageNumber(0)
        : inputValue > totalPages
        ? setPageNumber(totalPages - 1)
        : setPageNumber(inputValue - 1);
    }
  };

  const handleNextPage = () => {
    setPageNumber((prev: number) => (prev += 1));
  };

  const handlePrevPage = () => {
    setPageNumber((prev: number) => (prev -= 1));
  };

  const handleFirstPage = () => {
    setPageNumber(0);
  };

  const handleLastPage = () => {
    setPageNumber(totalPages - 1);
  };

  const [inputValue, setInputValue] = useState<number>(pageNumber + 1);

  return (
    <Box
      className="data-table"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Text className="table-heading">DataTable</Text>
      <Table className="table" variant="striped">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                onClick={() => handleHeaderClick(header)}
                cursor={sortable ? "pointer" : "auto"}
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {page.map((row, index) => (
            <Tr key={index}>
              {Object.values(row).map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {pagination && (
        <Flex
          className="pagination-footer"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex className="pagination-btn-group">
            <IconButton
              className="pagination-btns"
              aria-label="first-page"
              icon={<ArrowLeftIcon h={3} w={3} />}
              onClick={handleFirstPage}
            />
            <IconButton
              className="pagination-btns"
              aria-label="previous-page"
              icon={<ChevronLeftIcon h={6} w={6} />}
              onClick={handlePrevPage}
            />
          </Flex>
          <Flex alignItems="center">
            <Flex justifyContent="space-between" alignItems="center" mx={4}>
              <Text mx={2} whiteSpace="nowrap">
                Jump to Page :
              </Text>
              <Input
                value={inputValue}
                type="number"
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                width={20}
              />
            </Flex>
            <Flex>
              <Badge p={2} px={4}>
                {`Page ${pageNumber + 1} of ${totalPages}`}
              </Badge>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mx={4}>
              <Text mx={2} whiteSpace="nowrap">
                Rows per Page :{" "}
              </Text>
              <Select />
            </Flex>
          </Flex>
          <Flex className="pagination-btn-group">
            <IconButton
              className="pagination-btns"
              aria-label="next-page"
              icon={<ChevronRightIcon h={6} w={6} />}
              onClick={handleNextPage}
            />
            <IconButton
              className="pagination-btns"
              aria-label="last-page"
              icon={<ArrowRightIcon h={3} w={3} />}
              onClick={handleLastPage}
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default DataTable;
