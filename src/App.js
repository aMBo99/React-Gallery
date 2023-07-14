import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [isLoading, setisLoading] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [photoNameInput, setPhotoNameInput] = useState('');
  const [photoLinkInput, setPhotoLinkInput] = useState('');

  useEffect(() => {
    setisLoading(true);
     fetch('http://localhost:27017')
      .then(res => {
        return res.json();
      })
      .then(resp => {
        if (resp) setPhotos(() => [...resp]);
        console.log(resp);
        setisLoading(false);
      });
  }, []);

  function addPhoto(e) {
    if (!photoLinkInput || !photoNameInput) return;
    const newPhoto = {name: photoNameInput, link: photoLinkInput, id: uuidv4()};
    fetch('http://localhost:27017', {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPhoto)
    })
    .then(res => {
      return res.json();
    })
    .then(resp => {
      console.log(resp);
    });

    setPhotos(prevPhotos => {
      return [...prevPhotos, newPhoto];
    })
  }

  function handleLinkInput(e) {
    const newLink = e.target.value;
    setPhotoLinkInput(newLink);
  }

  function handleNameInput(e) {
    const newName = e.target.value;
    setPhotoNameInput(newName);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  if (isLoading) return <p>Loading...</p>;

  return (
  <>
    <Gallery photos={photos} setPhotos={setPhotos}/>
    <form onSubmit={onSubmit}>
      <label>Photo title: </label><br/>
      <input onInput={handleNameInput} type='text' value={photoNameInput}/><br/>
      <label>Photo link: </label><br/>
      <input onInput={handleLinkInput} type='text' value={photoLinkInput}/><br/><br/>
      <button onClick={addPhoto}>Add photo</button>
    </form>
  </>
  );
}

export default App;
