import { useEffect } from "react";

const YarnSub = () => {
  const getYarn = async () => {
    try {
      console.log("res");
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
