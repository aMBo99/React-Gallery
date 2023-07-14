const express = require('express');
const app = express();
const cors = require('cors');
const port = 27017;

const mongoose = require('mongoose');
const Photo = require('./Schema');
mongoose.connect('mongodb://localhost:27017/galleryDB')
.then(() => {
  console.log('Connection successful!');
})
.catch(err => {
  console.error('Connection failed.');
  console.log(err);
});

// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'html');

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(cors());

app.use((req, res, next) => {
  console.log('Requesting...');
  next();
});

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  console.log(photos);
  res.json(photos);
  //res.render('../public/index', {photos});
});

app.put('/', addPhoto, (req, res) => {
  if (req.body) {
    //res.json({msg: 'Photo added successfully!'});
    console.log('Photo added successfully!');
  } else {
    res.send('Failed to add photo. Refresh and try again.');
  }
});

app.delete('/', deletePhoto, (req, res) => {
  console.log('Photo removed successfully!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use((req, res) => {
  res.status(404).send("Error: Invalid destination.");
});

async function addPhoto(req, res, next) {
  console.log('Adding new photo...');
  try {
    const newPhoto = await Photo.create({
      name: req.body.name,
      link: req.body.link
    });
    await newPhoto.save();
    console.log(newPhoto);
  }
  catch(e) {
    console.log(e.message)
  }
  next();
}

async function deletePhoto(req, res, next) {
  console.log('Deleting photo...');
  try {
    const { _id } = req.body;
    const deadPhoto = await Photo.findByIdAndDelete(_id);
    console.log(`Removed photo with id ${deadPhoto._id}`);
    for(var i = 0; i < 1000000000; i++) {
    }
    res.json(deadPhoto);
  }
  catch(e) {
    console.log(e.message)
  }
  next();
}