const NoteCard = ({ note, onDelete }) => (
  <div className="bg-white shadow p-4 rounded mb-4 border">
    <h3 className="text-lg font-semibold">{note.title}</h3>
    <p className="text-gray-700 mt-1">{note.content}</p>
    <button
      onClick={() => onDelete(note._id)}
      className="text-red-600 text-sm mt-2 hover:underline"
    >
      Delete
    </button>
  </div>
);

export default NoteCard;
