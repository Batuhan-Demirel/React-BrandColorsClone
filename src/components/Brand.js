import React, { useContext } from "react";
import getContrastYIQ from "./helpers";
import MainContext from "./MainContext";
import ClipboardButton from "react-clipboard.js";

const Brand = ({ brand }) => {
  const { setSelectedBrands, selectedBrands,setCopied } = useContext(MainContext);

  const toggleSelected = () => {
    if (selectedBrands.includes(brand.slug)) {
      setSelectedBrands(selectedBrands.filter((slug) => slug !== brand.slug));
    } else {
      setSelectedBrands([...selectedBrands, brand.slug]);
    }
  };

  const setColor =(color)=>{
      setCopied(color)

  }

  return (
    <div
      className={`brand ${
        selectedBrands.includes(brand.slug) ? "selected" : ""
      }`}
    >
      <h5 onClick={toggleSelected}>{brand.title}</h5>
      <div className="brand-colors">
        {brand.colors.map((color,i) => (
          <>
            <ClipboardButton
              key={i}
              component="span"
              style={{
                "--bgColor": `#${color}`,
                "--text-color": `${getContrastYIQ(color)}`,
              }}
              data-clipboard-text={`#${color}`}

              onSuccess={()=>setColor(color)}
            >
              #{color}
            </ClipboardButton>
          </>
        ))}
      </div>
    </div>
  );
};

export default Brand;
