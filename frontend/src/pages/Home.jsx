import Hero from "../components/Home/Hero"
import TopChart from "../components/Home/TopChart";


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
