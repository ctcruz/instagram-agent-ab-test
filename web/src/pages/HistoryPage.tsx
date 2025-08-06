import React, { useEffect, useState } from "react";
import { ContentHistoryTable } from "@/features/ContentHistoryTable";

const HistoryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/content/history")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Content History</h1>
      <ContentHistoryTable data={data} />
    </div>
  );
};

export default HistoryPage;
