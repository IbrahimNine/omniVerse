import "./NewCollectionName.css";
import { useCollectionsContext } from "../../contexts/CollectionsContext";

function NewCollectionName() {
  const {
    setShowNewCollectionName,
    newCollection,
    setNewCollection,
    addNewCollection,
  } = useCollectionsContext();

  const handleNewCollection = (e) => {
    e.preventDefault();
    addNewCollection();
  };

  return (
    <div className="NewCollectionNameWrapper">
      <form onSubmit={handleNewCollection} className="NewCollectionName">
        <h3>New Collection Title:</h3>
        <input
          type="text"
          name="CollectionTitle"
          id="CollectionTitle"
          placeholder="Collection Title..."
          onChange={(e) =>
            setNewCollection({ ...newCollection, title: e.target.value })
          }
        />
        <div className="NewCollectionNameBtns">
          <button type="submit">Create Collection</button>
          <button type="button" onClick={() => setShowNewCollectionName(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCollectionName;
