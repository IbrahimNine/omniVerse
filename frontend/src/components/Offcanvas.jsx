import React, { useState, useEffect } from "react";
import "./Offcanvas.css";
import { useFiltersContext } from "../contexts/FiltersContext";

const Offcanvas = () => {
  const [visible, setVisible] = useState(true);
  const [userInput, setUserInput] = useState();
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
    setFilterBy('master');
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
    "Pop Rock",
    "House",
    "Vocal",
    "Experimental",
    "Punk",
    "Synth-pop",
    "Alternative Rock",
    "Techno",
    "Indie Rock",
    "Soul",
    "Disco",
    "Ambient",
    "Hardcore",
    "Folk",
    "Country",
    "Ballad",
    "Hard Rock",
    "Electro",
    "Rock & Roll",
    "Chanson",
    "Trance",
    "Heavy Metal",
    "Psychedelic Rock",
    "Romantic",
    "Folk Rock",
    "Downtempo",
    "Soundtrack",
    "Noise",
    "Schlager",
    "Prog Rock",
    "Classic Rock",
    "Funk",
    "Easy Listening",
    "Black Metal",
    "Tech House",
    "Blues Rock",
    "New Wave",
    "Rhythm & Blues",
    "Deep House",
    "Industrial",
    "Classical",
    "Death Metal",
    "Drum n Bass",
    "Progressive House",
    "Euro House",
    "Soft Rock",
    "Garage Rock",
    "Abstract",
    "Minimal",
    "Europop",
    "Gospel",
    "Acoustic",
    "Thrash",
    "Baroque",
    "Swing",
    "Modern",
    "Big Band",
    "Dub",
    "Country Rock",
    "Contemporary Jazz",
    "Breakbeat",
    "Drone",
    "Indie Pop",
    "Progressive Trance",
    "Opera",
    "Holiday",
    "Dancehall",
    "IDM",
    "Contemporary",
    "RnB/Swing",
    "Breaks",
    "Reggae",
    "African",
    "Art Rock",
    "Dark Ambient",
    "Fusion",
    "Post-Punk",
    "Doom Metal",
    "Gangsta",
    "Avantgarde",
    "Pop Rap",
    "Religious",
    "Dance-pop",
    "Hard Trance",
    "Beat",
    "Rockabilly",
    "Electro House",
    "Acid",
    "Jazz-Funk",
    "Instrumental",
    "Roots Reggae",
    "Lo-Fi",
    "Comedy",
    "Score",
    "Contemporary R&B",
    "Grindcore",
    "Theme",
    "Leftfield",
    "Ska",
    "Post Rock",
    "Dubstep",
    "Soul-Jazz",
    "Spoken Word",
    "Power Pop",
    "Psy-Trance",
    "Glam",
    "Hip Hop",
    "Salsa",
    "New Age",
    "Modern Classical",
    "Bop",
    "Bolero",
    "Goth Rock",
    "Conscious",
    "Jazz-Rock",
    "Hard House",
    "Free Improvisation",
    "Trip Hop",
    "Cumbia",
    "Emo",
    "Musical",
    "Latin Jazz",
    "Italo-Disco",
    "Stoner Rock",
    "EBM",
    "J-pop",
    "Volksmusik",
    "MPB",
    "Surf",
    "Shoegaze",
    "Hard Bop",
    "Jungle",
    "Free Jazz",
    "Doo Wop",
    "Field Recording",
    "Garage House",
    "Story",
    "Oi",
    "Hardstyle",
    "Samba",
    "Pop Punk",
    "Cool Jazz",
    "Tango",
    "Synthwave",
    "Darkwave",
    "Celtic",
    "Radioplay",
    "Post Bop",
    "Happy Hardcore",
    "Bluegrass",
    "Laïkó",
    "UK Garage",
    "Choral",
    "Vaporwave",
    "Eurodance",
    "Tribal",
    "Novelty",
    "Smooth Jazz",
    "Polka",
    "Flamenco",
    "Metalcore",
    "Trap",
    "Italodance",
    "Grunge",
    "Hardcore Hip-Hop",
    "Dixieland",
    "Arena Rock",
    "Progressive Metal",
    "Southern Rock",
    "Symphonic Rock",
    "AOR",
    "Future Jazz",
    "Latin",
    "Hindustani",
    "Nu Metal",
    "Parody",
    "Rumba",
    "Glitch",
    "Cha-Cha",
    "Space Rock",
    "Krautrock",
    "Harsh Noise Wall",
    "Boom Bap",
    "Dub Techno",
    "Gabber",
    "Power Metal",
    "Merengue",
    "Audiobook",
    "Bossa Nova",
    "Modal",
    "Broken Beat",
    "Chicago Blues",
    "Berlin-School",
    "Nu-Disco",
    "Rocksteady",
    "Indian Classical",
    "Neofolk",
    "Ethereal",
    "Psychedelic",
    "Light Music",
    "Education",
    "Afrobeat",
    "Crust",
    "Neo Soul",
    "Britpop",
    "Afro-Cuban",
    "Lounge",
    "Impressionist",
    "Grime",
    "Guaracha",
    "Operetta",
    "Hip-House",
    "Goa Trance",
    "Ragtime",
    "Mandopop",
    "G-Funk",
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
