import { useContext } from "react";
import Search from "./Search";
import LazyLoad from "react-lazyload";
import Brand from "./Brand";
import MainContext from "./MainContext";
import Downland from "./Downland";
import Loading from "./Loading";
import {List,AutoSizer} from 'react-virtualized';

const Content = () => {
  const { brands,selectedBrands } = useContext(MainContext);

  const rowRenderer = ({ key, index, style, isScrolling, isVisible }) => {
		const content = isScrolling ? <Loading /> : <Brand brand={brands[index]}  />;
		return (
			<div style={style} key={key}>
				{content}
			</div>
		)
	}

  return (
    <main className="content">
      <header className="header">
        <Search />
       {selectedBrands.length ? <Downland/>: ""}
      </header>
      <section className="brands">
				<AutoSizer>
					{({height, width}) => (
						<List
							width={width}
							height={height}
							rowCount={brands.length}
							rowHeight={113}
							rowRenderer={rowRenderer}
						/>
					)}
				</AutoSizer>
			</section>
    </main>
  );
};

export default Content;
