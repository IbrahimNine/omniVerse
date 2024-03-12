import { useEffect } from "react";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import "./UserCollectionsList.css";

function UserCollectionsList() {
  const {
    getUserCollections,
    collections,
    setShowUserCollectionsList,
    addToExistingCollection,
    itemToCollect,
  } = useCollectionsContext();
  useEffect(() => {
    getUserCollections();
  }, [getUserCollections]);
  return (
    <div className="UserCollectionsListWrapper">
      <div className="UserCollectionsList">
        <div className="CollectionsListFirstLayerWrapper">
          <div className="CollectionsListSecondLayerWrapper">
            {collections.length > 0
              ? collections.map((collection, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      addToExistingCollection(
                        collection._id,
                        collection.title,
                        itemToCollect,
                        collection.elements
                      )
                    }
                  >
                    {collection.title}
                  </div>
                ))
              : "No Collections Yet"}
          </div>
        </div>
        <button type="button" onClick={() => setShowUserCollectionsList(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UserCollectionsList;
