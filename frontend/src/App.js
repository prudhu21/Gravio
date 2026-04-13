/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react';
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

  // ✅ FETCH NOTES
  const fetchNotes = useCallback(async () => {
    try {
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const saveNote = useCallback(async () => {
  if (!currentNote.title && !currentNote.content) return;

  try {
    if (currentNote.id) {
      await API.put(`/notes/${currentNote.id}`, currentNote);
    } else {
      await API.post('/notes', currentNote);
    }

    fetchNotes();
  } catch (err) {
    console.error(err);
  }
}, [currentNote]);

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
    saveNote(currentNote);
  }, 800);

  return () => clearTimeout(timeout);
}, [currentNote]);
  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div className={dark ? "app-container dark" : "app-container"}>

      {/* 🔹 Sidebar */}
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

        {/* ✅ Logout at bottom */}
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 Main */}
      <div className="main">
        <Editor
          note={currentNote}
          setNote={setCurrentNote}
          saveNote={() => saveNote(currentNote)}
        />

        <Preview content={currentNote.content} />
      </div>

    </div>
  );
}

export default App;