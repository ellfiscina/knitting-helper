import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Yarn } from "../services/types";

const YarnSub = () => {
  const [name, setName] = useState<string>("");
  const [yarnList, setYarnList] = useState<Yarn[]>([]);

  const getYarn = async () => {
    try {
      const response = await axios.get("http://localhost:8000/ravelry/yarns", {
        params: { name },
      });
      setYarnList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOnSubmit = () => {
    getYarn();
  };

  return (
    <>
      <Grid
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Yarn Name"
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          name="query"
          onChange={handleChange}
          style={{ width: "310px" }}
        />
        <Button
          className="d-block"
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleOnSubmit}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default YarnSub;
