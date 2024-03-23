import { useEffect } from "react";
import Hero from "../components/Home/Hero";
import TopChart from "../components/Home/TopChart";
import { useFiltersContext } from "../contexts/FiltersContext";
import Footer from "../components/Home/Footer";


function Home() {
  const { setGlobalSearch, setFilterSet, setFilterBy } = useFiltersContext();
  useEffect(() => {
    setGlobalSearch("");
    setFilterSet({});
    setFilterBy("artist");
  }, [setGlobalSearch, setFilterSet, setFilterBy]);


  return (
    <div className="Home">
      <Hero />
      <TopChart filterBy="artist" />
      <TopChart filterBy="master" />
      <Footer />
    </div>
  );
}

export default Home;
