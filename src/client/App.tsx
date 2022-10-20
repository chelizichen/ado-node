import React, { useEffect } from "react";
import styles from "@/App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/views/Home/index";
import About from "@/views/About/index";
import { useAuthorStore, useTestStore } from "./store";
import ViteSvg from "@/assets/vite.svg";
import LogoSvg from "@/assets/logo.svg";

function App(): JSX.Element {
  const { name, setName } = useAuthorStore((state) => state);
  const { version, increment } = useTestStore((state) => state);

  useEffect(() => {
    setName();
  }, []);
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles["App-header"]}>
          <div className={styles["center"]}>
            <img src={ViteSvg} className={styles["viteSvg"]}></img>
            <img src={LogoSvg} className={styles["logoSvg"]}></img>
          </div>
          <div onClick={increment} className={styles["author"]}>
            {name} {version}
          </div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
