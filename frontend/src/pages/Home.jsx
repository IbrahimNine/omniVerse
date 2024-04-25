import { useEffect } from "react";
import Hero from "../components/Home/Hero";
import TopChart from "../components/Home/TopChart";
import { useFiltersContext } from "../contexts/FiltersContext";
import Footer from "../components/Home/Footer";

function Home({ isVisible }) {
  const { setGlobalSearch, setFilterSet, setFilterBy } = useFiltersContext();

  useEffect(() => {
    setGlobalSearch("");
    setFilterSet({});
    setFilterBy("master");
  }, [setGlobalSearch, setFilterSet, setFilterBy]);

  return (
    <div
      className="Home"
      style={isVisible ? null : { height: "100vh", overflow: "hidden" }}
    >
      <Hero />
      <TopChart filterBy="artist" index={0} />
      <TopChart filterBy="master" index={1} />
      <Footer />
    </div>
  );
}

export default Home;
