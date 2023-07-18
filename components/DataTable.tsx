"use client";

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
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import "../app/globals.css";

interface DataTableProps {
  caption?: string;
  headers: string[];
  rows: (string | JSX.Element)[][];
  sortable?: boolean;
  pagination?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  caption,
  headers,
  rows,
  sortable,
  pagination,
}) => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleHeaderClick = (column: string) => {
    if (sortable) {
      if (sortedColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortedColumn(column);
        setSortDirection("asc");
      }
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Box className="data-table">
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
          {rows.map((row, index) => (
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
            ></IconButton>
            <IconButton
              className="pagination-btns"
              aria-label="previous-page"
              icon={<ChevronLeftIcon h={6} w={6} />}
            ></IconButton>
          </Flex>
          <Flex className="pagination-btn-group">
            <IconButton
              className="pagination-btns"
              aria-label="last-page"
              icon={<ArrowRightIcon h={3} w={3} />}
            ></IconButton>
            <IconButton
              className="pagination-btns"
              aria-label="next-page"
              icon={<ChevronRightIcon h={6} w={6} />}
            ></IconButton>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default DataTable;
