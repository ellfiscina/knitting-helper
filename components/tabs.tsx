import { useState, SyntheticEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Gauge from "./gauge";
import Calculator from "./calculator";
import YarnSub from "./yarnSub";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const ColorTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{ width: "100%" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value={0} label="Calculator" />
          <Tab value={1} label="Gauge" />
          <Tab value={2} label="Sub" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Calculator />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Gauge />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <YarnSub />
      </TabPanel>
    </>
  );
};

export default ColorTabs;
