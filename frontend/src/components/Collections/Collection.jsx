import { useCollectionsContext } from "../../contexts/CollectionsContext";
import "./Collection.css";

function Collection({ collection }) {
  const { deleteCollection, deleteItemFromCollection } =
    useCollectionsContext();
  // useEffect(() => {
  //   const secondLayerWrapper = document.querySelector(".SecondLayerWrapper");
  //   const handleScroll = (event) => {
  //     event.preventDefault();
  //     secondLayerWrapper.scrollLeft += event.deltaY;
  //   };
  //   secondLayerWrapper.addEventListener("wheel", handleScroll);
  //   return () => {
  //     secondLayerWrapper.removeEventListener("wheel", handleScroll);
  //   };
  // }, []);


  return (
    <div className="CollectionWrapper">
      <div className="CollectionHeader">
        <h4>{collection.title}</h4>
        <abbr title="Delete Collection">
          <button
            type="button"
            onClick={() => deleteCollection(collection._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 13.09V10h2v3.09c-.33-.05-.66-.09-1-.09c-.34 0-.67.04-1 .09M14.5 11h-5c-.28 0-.5.22-.5.5V13h6v-1.5c0-.28-.22-.5-.5-.5M6 19v-9H4v11h9.35c-.22-.63-.35-1.3-.35-2zM21 9H3V3h18zm-2-4H5v2h14zm3.54 11.88l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19z"
              ></path>
            </svg>
          </button>
        </abbr>
      </div>
      <div className="FirstLayerWrapper">
        <div className="SecondLayerWrapper">
          <div className="Collection">
            {collection.elements.map((item, index) => {
              return (
                <div key={index} className="collection-item">
                  <img src={item.elementPic} alt="" />
                  <h5>{item.elementTitle}</h5>
                  <abbr title="Delete from Collection">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                      className="deleteCollectionItem"
                      onClick={() =>
                        deleteItemFromCollection(
                          collection._id,
                          item._id,
                          collection
                        )
                      }
                    >
                      <path
                        fill="currentColor"
                        d="M13 19c0 1.1.3 2.12.81 3H6c-1.11 0-2-.89-2-2V4a2 2 0 0 1 2-2h1v7l2.5-1.5L12 9V2h6a2 2 0 0 1 2 2v9.09c-.33-.05-.66-.09-1-.09c-3.31 0-6 2.69-6 6m9.54-2.12l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19z"
                      ></path>
                    </svg>
                  </abbr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
