import { Card } from "@mui/material";
import { ReactElement } from "react";

const ResultBox = ({ results }: { results: string | null }): ReactElement => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4rem",
      }}
    >
      {results && <h5 className="pt-2">{results}</h5>}
    </Card>
  );
};

export default ResultBox;
