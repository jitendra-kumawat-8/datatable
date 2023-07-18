"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

const Home: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my.api.mockaroo.com/data.json?key=94929a20"
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <ChakraProvider>
      {data.length != 0 && (
        <DataTable
          caption="Bookings"
          headers={Object.keys(data[0])}
          rows={data}
          sortable
          pagination
        />
      )}
    </ChakraProvider>
  );
};

export default Home;
