import "./FullSizePhoto.css";
import { useArtistContext } from "../../contexts/ArtistContext";

function FullSizePhoto() {
  const { artistData, showFullSize, setShowFullSize } = useArtistContext();
  const handleShowFullSize = (e) => {
    if (e.target.tagName !== "IMG") {
      setShowFullSize(!showFullSize);
    }
  };
  return (
    <div className="FullSizePhoto" onClick={handleShowFullSize}>
      <img src={artistData.images[0].uri} alt="Full artist pic" />
    </div>
  );
}

export default FullSizePhoto;
