import "./Confirmation.css";

function Confirmation({ setShowConfirmation, deleteCollection, collectionID }) {
  return (
    <div className="ConfirmationWrapper">
      <div className="Confirmation">
        <p>Are you sure you want to delete this Collection?</p>
        <div className="ConfirmationBtns">
          <button
            type="button"
            onClick={() => {
              deleteCollection(collectionID);
              setShowConfirmation(false);
            }}
          >
            Confirm
          </button>
          <button type="button" onClick={() => setShowConfirmation(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
