import React, { useState, useEffect } from 'react';
import API from '../services/api';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await API.get('/notes');
        setNotes(res.data);
      } catch (err) {
        console.error(err); 
        alert('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Handle note creation
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    try {
      const res = await API.post('/notes', { title, content });
      setNotes([res.data, ...notes]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err); // ✅ log the error
      alert('Failed to add note');
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err); 
      alert('Failed to delete note');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Notes</h1>

      {/* Add Note Form */}
      <form onSubmit={handleAddNote} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content (optional)"
          className="w-full border p-2 rounded"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Note
        </button>
      </form>

      {/* Notes List */}
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map(({ _id, title, content }) => (
            <li
              key={_id}
              className="border p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                {content && <p className="mt-1 text-gray-700">{content}</p>}
              </div>
              <button
                onClick={() => handleDelete(_id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete note"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesPage;
