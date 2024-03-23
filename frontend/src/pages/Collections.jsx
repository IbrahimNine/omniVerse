import React, { useEffect } from "react";
import { useCollectionsContext } from "../contexts/CollectionsContext";
import Collection from "../components/Collections/Collection";

function Collections() {
  const { getUserCollections, collections } = useCollectionsContext();
  useEffect(() => {
    getUserCollections();
  }, [getUserCollections]);

  return (
    <div className="Collections">
      <h2>Collections</h2>
      <div className="collectionsWrapper">
        <div className="collections-container">
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <Collection key={index} collection={collection} index={index} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              No Collections yet,
              <br /> Go to your favorite artists and start collecting their best
              records 🎵
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
