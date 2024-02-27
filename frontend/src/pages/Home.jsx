import Hero from "../components/Hero";
import TopChart from "../components/TopChart";


function Home() {
  return (
    <div className="Home">
      <Hero />
      <TopChart filterBy="artist" />
      <TopChart filterBy="master" />
    </div>
  );
}

export default Home;
