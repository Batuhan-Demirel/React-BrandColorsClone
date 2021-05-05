import "./App.css";
import Content from "./components/Content";
import React, { useState, useEffect } from "react";
import MainContext from "./components/MainContext";
import Sidebar from "./components/Sidebar";
import BrandsData from "./brands.json";
import Copied from "./components/Copied";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Collection from "./components/Collection";
import { forceCheck } from "react-lazyload";

function App() {
  const brandsArray = [];
  Object.keys(BrandsData).map((key) => {
    brandsArray.push(BrandsData[key]);
  });

  const [brands, setBrands] = useState(brandsArray);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const data = {
    brands,
    selectedBrands,
    setSelectedBrands,
    setCopied,
    search,
    setSearch,
  };

  useEffect(() => {
    setBrands(
      brandsArray.filter((brand) => brand.title.toLowerCase().includes(search))
    );
  }, [search]);

  useEffect(() => {
    forceCheck();
  }, [brands]);

  return (
    <>
      <MainContext.Provider value={data}>
        <Sidebar />
        <Router>
          <Switch>
            <Route exact path="/">
              <Content />
            </Route>
            <Route exact path="/collection/:slugs">
              <Collection />
            </Route>
          </Switch>
        </Router>

        {copied && <Copied color={copied} />}
      </MainContext.Provider>
    </>
  );
}

export default App;
