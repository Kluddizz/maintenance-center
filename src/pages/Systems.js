import React, { useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";

const Systems = ({ ...props }) => {

  const [, setTitle] = useContext(AppContext);

  useEffect(() => {
    setTitle("Anlagen");
  }, [setTitle]);

  return (
    <div>
    </div>
  );

};

export default Systems;
