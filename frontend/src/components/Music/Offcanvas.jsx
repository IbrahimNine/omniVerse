import React, { useState, useEffect } from "react";
import "./Offcanvas.css";
import { useFiltersContext } from "../../contexts/FiltersContext";

const Offcanvas = () => {
  const [visible, setVisible] = useState(true);
  const [userInput, setUserInput] = useState({
    title: "",
    style: "",
    decade: "",
    year: "",
  });
  const { setFilterSet, setGlobalSearch, setFilterBy } = useFiltersContext();

  const handlerFiltersBar = () => {
    if (visible) {
      const filtersInput = document.querySelector(".filtersInput");
      const container = document.querySelector(".contents");
      const Offcanvas = document.querySelector(".Offcanvas");
      filtersInput.style.width = "0";
      container.style.paddingLeft = "0";
      Offcanvas.style.width = "48px";
      setTimeout(() => {
        setVisible(!visible);
      }, 300);
    } else {
      setVisible(!visible);
    }
  };
  useEffect(() => {
    let delayEffect;
    if (visible) {
      const filtersInput = document.querySelector(".filtersInput");
      const container = document.querySelector(".contents");
      const Offcanvas = document.querySelector(".Offcanvas");
      delayEffect = setTimeout(() => {
        filtersInput.style.width = "100%";
        container.style.paddingLeft = "25%";
        Offcanvas.style.width = "25%";
      }, 0);
    }
    return () => {
      clearTimeout(delayEffect);
    };
  }, [visible]);

  const handleFilters = (e) => {
    e.preventDefault();
    setFilterSet(userInput);
    setGlobalSearch(userInput.title);
    setFilterBy("master");
  };

  const start = 1900;
  const end = new Date().getFullYear();
  const years = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  
  const decades = Array.from(
    new Set(years.map((year) => Math.floor(year / 10) * 10))
  );

  const genres = [
    "Abstract",
    "Acid",
    "Acoustic",
    "African",
    "Afrobeat",
    "Afro-Cuban",
    "AOR",
    "Ambient",
    "Art Rock",
    "Arena Rock",
    "Avantgarde",
    "Audiobook",
    "Alternative Rock",
    "Ballad",
    "Beat",
    "Big Band",
    "Black Metal",
    "Blues Rock",
    "Bolero",
    "Bop",
    "Bossa Nova",
    "Breakbeat",
    "Breaks",
    "Britpop",
    "Broken Beat",
    "Boom Bap",
    "Celtic",
    "Chanson",
    "Choral",
    "Cha-Cha",
    "Chicago Blues",
    "Classical",
    "Classic Rock",
    "Contemporary",
    "Contemporary Jazz",
    "Contemporary R&B",
    "Conscious",
    "Country",
    "Country Rock",
    "Cool Jazz",
    "Crust",
    "Cumbia",
    "Dancehall",
    "Dance-pop",
    "Darkwave",
    "Deathrock",
    "Deep House",
    "Disco",
    "Dixieland",
    "Doom Metal",
    "Doo Wop",
    "Downtempo",
    "Drone",
    "Drum n Bass",
    "Dub",
    "Dubstep",
    "Dub Techno",
    "EBM",
    "Easy Listening",
    "Education",
    "Electro",
    "Electro House",
    "Emo",
    "Ethereal",
    "Eurodance",
    "Euro House",
    "Europop",
    "Experimental",
    "Field Recording",
    "Flamenco",
    "Folk",
    "Folk Rock",
    "Free Improvisation",
    "Free Jazz",
    "Funk",
    "Future Jazz",
    "Fusion",
    "Gabber",
    "Gangsta",
    "Garage House",
    "Garage Rock",
    "Glam",
    "Glitch",
    "Goa Trance",
    "Gospel",
    "Goth Rock",
    "Grime",
    "Grindcore",
    "Grunge",
    "G-Funk",
    "Guaracha",
    "Happy Hardcore",
    "Hard Bop",
    "Hardcore",
    "Hardcore Hip-Hop",
    "Hard House",
    "Hard Rock",
    "Hardstyle",
    "Harsh Noise Wall",
    "Heavy Metal",
    "Hi-NRG",
    "Hindustani",
    "Hip Hop",
    "Hip-House",
    "Holiday",
    "House",
    "IDM",
    "Impressionist",
    "Indian Classical",
    "Indie Pop",
    "Indie Rock",
    "Industrial",
    "Instrumental",
    "Italodance",
    "Italo-Disco",
    "Jazz-Funk",
    "Jazz-Rock",
    "J-pop",
    "Jungle",
    "Krautrock",
    "Laïkó",
    "Latin",
    "Latin Jazz",
    "Leftfield",
    "Light Music",
    "Lounge",
    "Lo-Fi",
    "Mainstream",
    "Mandopop",
    "Meditation",
    "Melodic Death Metal",
    "Merengue",
    "Metalcore",
    "Minimal",
    "Modern",
    "Modern Classical",
    "MPB",
    "Musical",
    "Neo Soul",
    "Neofolk",
    "New Age",
    "New Wave",
    "Noise",
    "Novelty",
    "Nu-Disco",
    "Nu Metal",
    "Oi",
    "Opera",
    "Operetta",
    "Pop",
    "Pop Rap",
    "Pop Rock",
    "Post Bop",
    "Post-Punk",
    "Post Rock",
    "Power Metal",
    "Power Pop",
    "Progressive",
    "Progressive House",
    "Progressive Metal",
    "Progressive Trance",
    "Psychedelic",
    "Psychedelic Rock",
    "Psy-Trance",
    "Punk",
    "Ragtime",
    "Radioplay",
    "R&B",
    "Rap",
    "Rave",
    "Reggae",
    "Religious",
    "Rhythm & Blues",
    "Rock",
    "Rockabilly",
    "Rock & Roll",
    "Rocksteady",
    "Romantic",
    "Roots Reggae",
    "Rumba",
    "Salsa",
    "Samba",
    "Schlager",
    "Score",
    "Shoegaze",
    "Ska",
    "Smooth Jazz",
    "Soft Rock",
    "Soul",
    "Soul-Jazz",
    "Soundtrack",
    "Space Rock",
    "Spoken Word",
    "Story",
    "Stoner Rock",
    "Surf",
    "Swing",
    "Symphonic Rock",
    "Synth-pop",
    "Synthwave",
    "Tango",
    "Tech House",
    "Techno",
    "Theme",
    "Thrash",
    "Tribal",
    "Trance",
    "Trap",
    "Trip Hop",
    "UK Garage",
    "Vaporwave",
    "Vocal",
    "Volksmusik",
    "West Coast",
    "World",
  ];

  return (
    <div className="Offcanvas">
      {!visible && (
        <button id="offcanvasButton" type="button" onClick={handlerFiltersBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"
            ></path>
          </svg>
        </button>
      )}
      {visible && (
        <form className="filtersInput" onSubmit={handleFilters}>
          <h2>Set your filters:</h2>
          <input
            placeholder="Album's title..."
            name="master"
            onChange={(e) => {
              setUserInput({
                ...userInput,
                title: e.target.value,
                master: true,
              });
            }}
          />
          <select
            onChange={(e) => {
              setUserInput({
                ...userInput,
                style: e.target.value,
              });
            }}
          >
            <option value="">Select genre..</option>
            {genres.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="filterByYears">
            <h4>Select by release date</h4>
            <div>
              <select
                onChange={(e) => {
                  setUserInput({
                    ...userInput,
                    decade: e.target.value,
                  });
                }}
              >
                <option value="">Decade..</option>
                {decades.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setUserInput({
                    ...userInput,
                    year: e.target.value,
                  });
                }}
              >
                <option value="">Year..</option>
                {years.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="Submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.94em"
              height="2em"
              viewBox="0 0 15 16"
            >
              <path
                fill="currentColor"
                d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34c.05.18.05.36 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"
              ></path>
            </svg>
          </button>
          <button type="button" id="sweepoutfilter" onClick={handlerFiltersBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
              ></path>
            </svg>
          </button>
        </form>
      )}
    </div>
  );
};

export default Offcanvas;
