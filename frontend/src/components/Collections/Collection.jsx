import { useState } from "react";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import "./Collection.css";
import { handleNext, handlePrevious } from "../../utils/sliderHandlers";
import Confirmation from "./Confirmation";

function Collection({ collection, index }) {
  const { showTracks } = useReleaseContext();
  const { deleteCollection, deleteItemFromCollection, updateCollectionTitle } =
    useCollectionsContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [newTitle, setNewTitle] = useState(collection.title);

  return (
    <>
      <div
        className="CollectionWrapper"
        style={{
          backgroundColor:
            index % 2 !== 0
              ? "rgba(174, 205, 255, 0.041)"
              : "rgba(174, 205, 255, 0.01)",
        }}
      >
        <div className="CollectionHeader">
          {showTitleEditor ? (
            <form className="titleEditorForm">
              <input
                type="text"
                id="titleEditor"
                defaultValue={collection.title}
                required
                placeholder="New collection name.."
                autoFocus
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  updateCollectionTitle(collection, newTitle);
                  setShowTitleEditor(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <path
                      strokeDasharray={60}
                      strokeDashoffset={60}
                      d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.5s"
                        values="60;0"
                      ></animate>
                    </path>
                    <path
                      strokeDasharray={14}
                      strokeDashoffset={14}
                      d="M8 12L11 15L16 10"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.2s"
                        values="14;0"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </button>
              <button type="button" onClick={() => setShowTitleEditor(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                  >
                    <path
                      strokeDasharray={60}
                      strokeDashoffset={60}
                      d="M5.63604 5.63603C9.15076 2.12131 14.8492 2.12131 18.364 5.63603C21.8787 9.15075 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15075 5.63604 5.63603Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.5s"
                        values="60;0"
                      ></animate>
                    </path>
                    <path
                      strokeDasharray={18}
                      strokeDashoffset={18}
                      d="M6 6L18 18"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.2s"
                        values="18;0"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </button>
            </form>
          ) : (
            <h2>
              {collection.title} &nbsp;
              <abbr title="Edit Collection name" className="editBtn">
                <button type="button" onClick={() => setShowTitleEditor(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.9em"
                    height="0.9em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    >
                      <path d="M8.4 10.6a2 2 0 0 1 3 3L6 19l-4 1l1-4Z"></path>
                      <path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"></path>
                    </g>
                  </svg>
                </button>
              </abbr>
            </h2>
          )}

          <abbr title="Delete Collection" className="deleteBtn">
            <button type="button" onClick={() => setShowConfirmation(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 6h4m-.6 14H2.6a.6.6 0 0 1-.6-.6V11h19.4a.6.6 0 0 1 .6.6v7.8a.6.6 0 0 1-.6.6M2 11V4.6a.6.6 0 0 1 .6-.6h6.178a.6.6 0 0 1 .39.144l3.164 2.712a.6.6 0 0 0 .39.144H14"
                ></path>
              </svg>
            </button>
          </abbr>
        </div>
        <div className="collectionBody">
          <button
            type="button"
            onClick={() => handlePrevious(setSliderPosition, sliderPosition)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"
              ></path>
            </svg>
          </button>
          <div className="FirstLayerWrapper">
            <div
              className="Collection"
              style={{ transform: `translateX(${sliderPosition}px)` }}
            >
              {collection.elements.map((item, index) => {
                return (
                  <div key={index} className="collection-item">
                    <img src={item.elementPic} alt="Album cover" />
                    <div
                      className="collected-item-title"
                      onClick={(e) => {
                        if (
                          e.target.className === "collected-item-title" ||
                          e.target.tagName === "H5"
                        ) {
                          showTracks({ id: item.elementID });
                        }
                      }}
                    >
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
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleNext(setSliderPosition, sliderPosition)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 20 20"
              onClick={() => handleNext(setSliderPosition, sliderPosition)}
            >
              <path
                fill="currentColor"
                d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {showConfirmation && (
        <Confirmation
          setShowConfirmation={setShowConfirmation}
          deleteCollection={deleteCollection}
          collectionID={collection._id}
        />
      )}
    </>
  );
}

export default Collection;
