import React, {useState} from "react";
import "./styles.css";

export default function Photo({ photo, setPhotos }) {

    const [isLoading, setisLoading] = useState(false);

  function removePhoto() {
    setisLoading(true);
    fetch("http://localhost:27017", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photo),
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
      })
      .then(() => {
        setPhotos((prevPhotos) => {
          return prevPhotos.filter((currentPhoto) => {
            return currentPhoto !== photo;
          });
        });
        setisLoading(false);
      });
  }
  
  if (isLoading) return <p>Loading...</p>;

  return (
    <div class="imgBlock">
      <h3>{photo.name}</h3>
      <form action="/">
        <button type="button" onClick={removePhoto}>
          Remove
        </button>
      </form>
      <img src={photo.link} alt="" />
    </div>
  );
}
