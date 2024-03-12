import { useEffect } from "react";
import Hero from "../components/Home/Hero";
import TopChart from "../components/Home/TopChart";
import { useFiltersContext } from "../contexts/FiltersContext";

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
    </div>
  );
}

export default Home;
