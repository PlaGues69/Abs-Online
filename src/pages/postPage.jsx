import React, { useEffect, useState } from "react";
import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} from "../services/postService";
import './Css/postPage.css';

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
    author: "",
  });
  const [selectedPostId, setSelectedPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPostId) {
        await updatePost(selectedPostId, form);
      } else {
        await createPost(form);
      }
      setForm({ title: "", body: "", author: "" });
      setSelectedPostId(null); // reset edit state
      fetchPosts();
    } catch (err) {
      console.error("Failed to submit post:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err.message);
    }
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      body: post.body,
      author: post.author?._id ?? post.author,
    });
    setSelectedPostId(post._id);
  };

  return (
    <div className="post-page">
      <h2>{selectedPostId ? "✏️ Edit Post" : "📌 Create a New Post"}</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Author ID"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <button type="submit">{selectedPostId ? "Update Post" : "Submit Post"}</button>
        {selectedPostId && (
          <button
            type="button"
            onClick={() => {
              setSelectedPostId(null);
              setForm({ title: "", body: "", author: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>📝 All Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="author">
              Author: {post.author?.username
                ?? post.author?.email
                ?? post.author?._id
                ?? "Unknown"}
            </p>
            <button onClick={() => handleDelete(post._id)} className="delete-btn">
              Delete
            </button>
            <button onClick={() => handleEdit(post)} className="edit-btn">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
