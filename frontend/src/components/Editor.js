import React from 'react';

function Editor({ note, setNote, saveNote }) {
  return (
    <div className="editor">

      <input
        type="text"
        placeholder="Enter title..."
        value={note.title}
        onChange={(e) =>
          setNote({ ...note, title: e.target.value })
        }
      />

      <textarea
        placeholder="Write Markdown here...

            # Heading
            **Bold**
            *Italic*
            - List
            [Link](url)
            "
        value={note.content}
        onChange={(e) =>
          setNote({ ...note, content: e.target.value })
        }
      />

      <button className="save-btn" onClick={saveNote}>
        Save
      </button>

    </div>
  );
}

export default Editor;