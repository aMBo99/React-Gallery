import React from 'react';
import Photo from './Photo';

export default function Gallery ({ photos, setPhotos }) {
    return (
        photos.map((photo, key) => {
            return <Photo key={key} photo={photo} setPhotos={setPhotos} />
        })
    )
}