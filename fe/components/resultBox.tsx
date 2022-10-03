import { Grid } from "@mui/material";
import { ReactElement } from "react";

const ResultBox = ({ results }: { results: string | null }): ReactElement => {
  return (
    <>
      {results ? (
        <Grid>
          <p className="pt-2">{results}</p>
        </Grid>
      ) : null}
    </>
  );
};

export default ResultBox;
