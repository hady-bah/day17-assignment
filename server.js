const express = require('express');
const app = express();
const port = 4000;
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

// sample data
let songs = [
  { id: 1, title: 'Hurts Me', artist: 'Tory Lanez' },
  { id: 2, title: 'Aurora', artist: 'Runaway' },
  { id: 3, title: 'My Song', artist: 'Labi Siffre'}
];

app.use(express.json());

// Routes
app.get('/songs', (req, res) => {
  res.json(songs);
});

app.get('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = songs.find((song) => song.id === id);

  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Create
app.post('/songs', (req, res) => {
  const song = req.body;

  if (!song.title || !song.artist) {
    res.status(400).json({ error: 'Title and artist are required' });
  } else {
    const id = songs.length + 1;
    const newSong = { id, ...song };
    songs.push(newSong);
    res.status(201).json(newSong);
  }
});


app.put('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSong = req.body;

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs[index] = { id, ...updatedSong };
    res.json(songs[index]);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

app.patch('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
  
    const song = songs.find((song) => song.id === id);
  
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
  
    Object.assign(song, updatedFields);
  
    res.json(song);
  });

//delete
app.delete('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    const deletedSong = songs.splice(index, 1);
    res.json(deletedSong[0]);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Invalid route' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




