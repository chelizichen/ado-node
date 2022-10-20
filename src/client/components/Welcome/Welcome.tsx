import React, { useCallback, useEffect, useState } from "react";
import { hello } from "@/api/hello";
import classes from "./Welcome.module.css";

async function setMessageSync(setMessage: Function) {
  const res = await hello();
  setMessage(res.message);
}
function Welcome() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessageSync(setMessage);
  }, []);

  return <p className={classes.message}>{message}</p>;
}

export default Welcome;
