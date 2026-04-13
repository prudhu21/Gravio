import React, { useEffect, useState } from 'react';
import API from './api';
import NotesList from './components/NotesList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Login from './components/Login';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('token')
  );
  const [selectedId, setSelectedId] = useState(null);

  const [currentNote, setCurrentNote] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await API.get('/notes');
    setNotes(res.data);
  };

  const saveNote = async () => {
    if (!currentNote.title && !currentNote.content) return;

    if (currentNote.id) {
      await API.put(`/notes/${currentNote.id}`, currentNote);
    } else {
      await API.post('/notes', currentNote);
    }
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();

    if (id === currentNote.id) {
      setCurrentNote({ title: '', content: '' });
      setSelectedId(null);
    }
  };
  const handleSelect = (note) => {
    setCurrentNote(note);
    setSelectedId(note.id);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!currentNote.id) return; 

    const timeout = setTimeout(() => {
      saveNote();
    }, 800);

    return () => clearTimeout(timeout);
  }, [currentNote,saveNote]);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <>
    <div className={dark ? "app-container dark" : "app-container"}>

      <div className="sidebar">
        <h2>Notes</h2>

        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="toggle-btn" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <NotesList
          notes={filteredNotes}
          onSelect={handleSelect}
          onDelete={deleteNote}
          selectedId={selectedId}
        />
      </div>

      {/* 🔹 Main */}
      <div className="main">
        <Editor
          note={currentNote}
          setNote={setCurrentNote}
          saveNote={saveNote}
        />

        <Preview content={currentNote.content} />
        <div>
          <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>

    </div>
    
    </>
  );
}

export default App;