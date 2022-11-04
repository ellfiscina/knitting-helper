import axios from "axios";
import { ChangeEvent, useState, ReactElement } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  ListItemButton,
} from "@mui/material";
import { Fiber, Yarn } from "../services/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBriefcase,
  faCircleCheck,
  faCircleXmark,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

const getFibers = (fibers: Fiber[]) => {
  return fibers.map((f) => f.name);
};

const ListIcon = ({
  firstYarn,
  yarn,
  attr,
}: {
  firstYarn: Yarn;
  yarn: Yarn;
  attr: keyof Yarn;
}): ReactElement => {
  let isEqual;
  let color;

  if (attr === "fibers") {
    const fibers = getFibers(yarn.fibers);
    const firstFibers = getFibers(firstYarn.fibers);
    if (fibers.toString() === firstFibers.toString()) {
      isEqual = true;
      color = "#27ae60";
    } else if (firstFibers.some((f) => fibers.includes(f))) {
      isEqual = true;
      color = "#f39c12";
    } else {
      isEqual = false;
      color = "#e74c3c";
    }
  } else {
    isEqual = yarn[attr] === firstYarn[attr];
    color = isEqual ? "#27ae60" : "#e74c3c";
  }
  return (
    <FontAwesomeIcon
      color={color}
      icon={isEqual ? faCircleCheck : faCircleXmark}
    />
  );
};

const YarnSub = () => {
  const [name, setName] = useState<string>("");
  const [yarnList, setYarnList] = useState<Yarn[]>([]);
  const [firstYarn, setFirstYarn] = useState<Yarn>();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const getYarn = async () => {
    try {
      const response = await axios.get(`${url}/ravelry/yarns`, {
        params: { name },
      });
      setFirstYarn(response.data.shift());
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

  const yardToMeter = (yard: number) => {
    return Math.round(yard * 0.9144);
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
      {firstYarn && (
        <Card variant="outlined">
          <CardHeader title={firstYarn.name} subheader={firstYarn.company} />
          <CardContent>
            <dl>
              <dt>weight</dt>
              <dd>{firstYarn.weight}</dd>
              <dt>texture</dt>
              <dd>{firstYarn.texture}</dd>
              <dt>fiber</dt>
              <dd>{getFibers(firstYarn.fibers).toString()}</dd>
              <dt>gauge</dt>
              <dd>{firstYarn.gauge}</dd>
              <dt>balls</dt>
              <dd>
                {`${firstYarn.grams}g; ${yardToMeter(firstYarn.yardage)}m (${
                  firstYarn.yardage
                } yds)`}
              </dd>
            </dl>
            <Divider />
            {yarnList.length > 0 && (
              <List>
                {yarnList.map((yarn, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<FontAwesomeIcon icon={faAngleDown} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h5>{yarn.name}</h5>
                      {yarn.link && (
                        <a
                          href={yarn.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 muted"
                        >
                          <FontAwesomeIcon
                            icon={faShoppingBasket}
                            color="#7b1fa2"
                          />
                        </a>
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <FontAwesomeIcon
                              icon={faBriefcase}
                              color="#7b1fa2"
                            />
                          </ListItemIcon>
                          <ListItemText primary={yarn.company} />
                        </ListItem>
                        {yarn.weight && (
                          <ListItem>
                            <ListItemIcon>
                              <ListIcon
                                firstYarn={firstYarn}
                                yarn={yarn}
                                attr="weight"
                              />
                            </ListItemIcon>
                            <ListItemText primary={yarn.weight} />
                          </ListItem>
                        )}
                        {yarn.texture && (
                          <ListItem>
                            <ListItemIcon>
                              <ListIcon
                                firstYarn={firstYarn}
                                yarn={yarn}
                                attr="texture"
                              />
                            </ListItemIcon>
                            <ListItemText primary={yarn.texture} />
                          </ListItem>
                        )}
                        <ListItem>
                          <ListItemIcon>
                            <ListIcon
                              firstYarn={firstYarn}
                              yarn={yarn}
                              attr="fibers"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={getFibers(yarn.fibers).toString()}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ListIcon
                              firstYarn={firstYarn}
                              yarn={yarn}
                              attr="gauge"
                            />
                          </ListItemIcon>
                          <ListItemText primary={yarn.gauge} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ListIcon
                              firstYarn={firstYarn}
                              yarn={yarn}
                              attr="grams"
                            />
                          </ListItemIcon>
                          <ListItemText primary={`${yarn.grams}g`} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ListIcon
                              firstYarn={firstYarn}
                              yarn={yarn}
                              attr="yardage"
                            />
                          </ListItemIcon>
                          <ListItemText primary={`${yarn.yardage} yds`} />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default YarnSub;
