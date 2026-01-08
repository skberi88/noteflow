"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  /* -------------------- DARK MODE -------------------- */
  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [darkMode]);

  /* -------------------- FETCH NOTES -------------------- */
  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes", { cache: "no-store" });
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* -------------------- ADD NOTE -------------------- */
  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  /* -------------------- DELETE NOTE -------------------- */
  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  /* -------------------- EDIT NOTE -------------------- */
  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = async (id) => {
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    setNotes((prev) =>
      prev.map((note) =>
        note._id === id
          ? { ...note, title: editTitle, content: editContent }
          : note
      )
    );
    setEditingId(null);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen transition-colors duration-500
                     bg-gradient-to-br from-blue-50 to-blue-100
                     dark:from-gray-900 dark:to-gray-800">

      {/* HEADER */}
      <header className="sticky top-0 z-10 backdrop-blur
                         bg-white/70 dark:bg-gray-900/70
                         border-b dark:border-gray-800 shadow-lg">
        <div className="max-w-3xl mx-auto px-6 py-4 space-y-3">

          {/* Top Row */}
          <div className="flex justify-between items-center">
            <h1
              className="text-xl sm:text-2xl font-bold tracking-tight
                         font-[var(--font-poppins)]
                         bg-gradient-to-r from-blue-600 to-green-500
                         bg-clip-text text-transparent"
            >
              NoteFlow
              <span className="ml-2 text-sm font-medium
                               text-gray-600 dark:text-gray-400">
                Notes App
              </span>
            </h1>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-full text-sm
                         bg-white dark:bg-gray-700
                         text-gray-800 dark:text-yellow-300
                         shadow-md hover:scale-105
                         transition-all duration-300"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search notes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-xl
                       border dark:border-gray-700
                       bg-white dark:bg-gray-800
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500
                       transition-all duration-300"
          />
        </div>
      </header>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-10">

        {/* ADD NOTE */}
        <div className="bg-white dark:bg-gray-800
                        rounded-2xl shadow-xl
                        border dark:border-gray-700
                        p-6 mb-10
                        hover:shadow-2xl transition-all duration-500">
          <input
            className="w-full mb-3 text-lg font-semibold bg-transparent
                       border-b dark:border-gray-600
                       focus:outline-none focus:border-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full resize-none bg-transparent
                       focus:outline-none"
            placeholder="Write your note..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="text-right mt-4">
            <button
              onClick={addNote}
              className="px-6 py-2 rounded-full
                         bg-gradient-to-r from-blue-600 to-blue-700
                         text-white shadow-lg
                         hover:shadow-xl hover:scale-105
                         transition-all duration-300"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* NOTES LIST */}
        <div className="space-y-6">
          {filteredNotes.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {searchTerm ? "No matching notes found" : "No notes yet. Start writing ✍️"}
            </p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white dark:bg-gray-800
                           rounded-2xl p-6
                           border dark:border-gray-700
                           shadow-lg hover:shadow-2xl
                           transform hover:-translate-y-1
                           transition-all duration-500"
              >
                {editingId === note._id ? (
                  <div className="space-y-3">
                    <input
                      className="w-full bg-transparent text-lg font-semibold
                                 border-b dark:border-gray-600
                                 focus:outline-none"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="w-full bg-transparent resize-none
                                 focus:outline-none"
                      rows={3}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => saveEdit(note._id)}
                        className="px-4 py-1.5 rounded-full
                                   bg-gradient-to-r from-green-500 to-green-600
                                   text-white shadow-md
                                   hover:scale-105 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:text-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {note.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {note.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
