import React, { useContext, useEffect } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import LazyLoad from "react-lazyload";
import { useHistory, useParams } from "react-router-dom";
import Brand from "./Brand";
import Downland from "./Downland";
import Loading from "./Loading";
import MainContext from "./MainContext";

const Collection = () => {
  const { slugs } = useParams();
  const history = useHistory();
  const { setSelectedBrands, selectedBrands, brands } = useContext(MainContext);

  useEffect(() => {
    setSelectedBrands(slugs.split(","));
  }, []);

  const clearSelectedBrands = () => {
    setSelectedBrands([]);
    history.push("/");
  };
  return (
    <main className="content">
      <header className="header">
        <a className="back-btn" onClick={clearSelectedBrands}>
          <GrLinkPrevious /> All Brands
        </a>
        {selectedBrands.length ? <Downland /> : ""}
      </header>
      <section className="brands">
        {selectedBrands.map((slug) => {
          let brand = brands.find((brand) => brand.slug == slug);
          return (
            <LazyLoad once={true} overflow={true} placeholder={<Loading/>}>
              <Brand brand={brand} />
            </LazyLoad>
          );
        })}
      </section>
    </main>
  );
};

export default Collection;
