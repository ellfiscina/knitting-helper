import { useEffect } from "react";
import hello from "../pages/api/hello";

const YarnSub = () => {
  const getYarn = async () => {
    try {
      //const res = await hello.get("yarn_attributes/groups.json");
      const res = await fetch(
        "http://api.ravelry.com/yarn_attributes/groups.json",
        {
          headers: {
            Authorization:
              "read-f304127ff38142c8444f373be8dee11e:2Q34GKTk9FEE1MR7Tep7t7tUo4ZNC63eR7b/X2KX",
          },
          method: "GET",
        }
      );
      console.log(res);
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    getYarn();
  });
  return <div>Sub</div>;
};

export default YarnSub;
