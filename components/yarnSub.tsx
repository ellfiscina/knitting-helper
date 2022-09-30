import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Yarn } from "../services/types";
import useAPI from "../services/useAPI";

const SearchResults = ({
  yarnName,
  setYarn,
  setStartFetching,
}: {
  yarnName: string;
  setYarn: (yarn: Yarn) => void;
  setStartFetching: (start: boolean) => void;
}) => {
  const { data, isLoading, isError } = useAPI(`/api/ravelry/${yarnName}`);

  console.log(data);
  if (isError) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (!isLoading && data && data.name.toLowerCase() === yarnName) {
    const selectedYarn: Yarn = {
      name: data.name,
      grams: data.grams,
      yardage: data.yardage,
      companyName: data.yarn_company.name,
      weight: data.yarn_weight.name,
      gaugeSt: data.min_gauge,
      gaugeIn: data.gauge_divisor,
      texture: data.texture,
      fibers: data.yarn_fibers.map((f: any) => f.fiber_type.name).join(","),
    };

    return <div>{selectedYarn.name}</div>;
  }
  return <div>Not found</div>;
};

const YarnSub = () => {
  const [startFetching, setStartFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [yarn, setYarn] = useState<Yarn | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartFetching(false);
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    setStartFetching(true);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "500px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="search-bar"
          label="Yarn name"
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          name="name"
          onChange={handleChange}
        />
        <Button
          className="d-block"
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
      {startFetching && (
        <SearchResults
          setYarn={setYarn}
          yarnName={searchTerm}
          setStartFetching={setStartFetching}
        />
      )}
    </>
  );
};

export default YarnSub;
