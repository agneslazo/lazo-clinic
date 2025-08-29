"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [pageData, setPageData] = useState<Record<string, unknown>>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/call/patient/get");
        const jsonData = await response.json();
        console.log(jsonData);
        setPageData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return <div>{JSON.stringify(pageData)}</div>;
}
