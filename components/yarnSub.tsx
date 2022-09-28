import { useEffect, useState } from "react";
import useAPI from "../services/useAPI";

const SearchResults = () => {
  const { data, isLoading, isError } = useAPI("/api/ravelry");

  console.log(data);
  if (isError) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>found</div>;
};

const YarnSub = () => {
  const [startFetching, setStartFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setStartFetching(false);
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    setStartFetching(true);
  };

  return (
    <>
      <div onClick={handleClick}>hello!</div>
      {startFetching && <SearchResults />}
    </>
  );
};

export default YarnSub;
