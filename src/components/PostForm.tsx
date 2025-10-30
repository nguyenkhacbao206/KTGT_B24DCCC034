import { useState, useEffect } from "react";
import { Post } from "../types/Post";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  isEdit?: boolean;
}

const PostForm = ({ posts, setPosts, isEdit = false }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingPost = posts.find((p) => p.id === Number(id));

  const [formData, setFormData] = useState<Post>(
    existingPost || {
      id: Date.now(),
      title: "",
      author: "",
      image: "",
      content: "",
      category: "Công nghệ",
      date: new Date().toLocaleDateString(),
    }
  );

  useEffect(() => {
    if (isEdit && existingPost) setFormData(existingPost);
  }, [isEdit, existingPost]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.title.trim().length < 3) return alert("Tiêu đề quá ngắn");
    if (formData.content.trim().length < 20) return alert("Nội dung quá ngắn");

    if (isEdit) {
      setPosts(posts.map((p) => (p.id === formData.id ? formData : p)));
      navigate(`/posts/${formData.id}`);
    } else {
      setPosts([...posts, formData]);
      navigate("/");
    }
  };

  return (
    <>
      <form className="post-form" onSubmit={handleSubmit}>
        <h3>{isEdit ? "Sửa bài viết" : "Tạo bài viết"}</h3>

        <label>Tiêu đề:</label>
        <input name="title" value={formData.title} onChange={handleChange} />

        <label>Tác giả:</label>
        <input name="author" value={formData.author} onChange={handleChange} />

        <label>Ảnh (URL):</label>
        <input name="image" value={formData.image} onChange={handleChange} />

        <label>Nội dung:</label>
        <textarea
          name="content"
          rows={5}
          value={formData.content}
          onChange={handleChange}
        />

        <label>Danh mục:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option>Công nghệ</option>
          <option>Du lịch</option>
          <option>Ẩm thực</option>
          <option>Bóng đá</option>
          <option>Khác</option>
        </select>

        <div className="actions">
          <button type="submit">{isEdit ? "Lưu" : "Đăng"}</button>
          <button type="button" onClick={() => navigate("/")}>
            Hủy
          </button>
        </div>
      </form>

      <style>
        {`
        .post-form {
          max-width: 600px;
          margin: 20px auto;
          border: 1px solid #999;
          padding: 15px;
          background: #f9f9f9;
          font-family: Arial, sans-serif;
        }

        .post-form h3 {
          margin-bottom: 10px;
        }

        .post-form label {
          display: block;
          margin-top: 10px;
          font-size: 14px;
        }

        .post-form input,
        .post-form textarea,
        .post-form select {
          width: 100%;
          border: 1px solid #999;
          padding: 5px;
          font-size: 14px;
        }

        .actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }

        .actions button {
          padding: 6px 12px;
          border: 1px solid #333;
          background: #eee;
          cursor: pointer;
        }

        .actions button:hover {
          background: #ddd;
        }
        `}
      </style>
    </>
  );
};

export default PostForm;
