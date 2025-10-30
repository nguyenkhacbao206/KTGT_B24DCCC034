import { Post } from "../types/Post";
import { useNavigate } from "react-router-dom";

interface Props {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard = ({ post, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Bạn có muốn xóa bài viết này?")) onDelete(post.id);
  };

  return (
    <>
      <div className="post-card">
        <img src={post.image} alt={post.title} />
        <h4>{post.title}</h4>
        <p><b>Tác giả:</b> {post.author}</p>
        <p><b>Ngày:</b> {post.date}</p>
        <div className="actions">
          <button onClick={() => navigate(`/posts/${post.id}`)}>Xem</button>
          <button onClick={() => navigate(`/edit/${post.id}`)}>Sửa</button>
          <button onClick={handleDelete}>Xóa</button>
        </div>
      </div>

      <style>
        {`
        .post-card {
          border: 1px solid #aaa;
          background: #fdfdfd;
          padding: 10px;
          text-align: left;
        }

        .post-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border: 1px solid #ccc;
        }

        .post-card h4 {
          margin: 8px 0;
          font-size: 16px;
        }

        .post-card p {
          font-size: 13px;
          margin: 2px 0;
        }

        .post-card .actions {
          margin-top: 8px;
          display: flex;
          gap: 5px;
        }

        .post-card button {
          flex: 1;
          padding: 5px;
          border: 1px solid #333;
          background: #eee;
          cursor: pointer;
          font-size: 13px;
        }

        .post-card button:hover {
          background: #ddd;
        }
        `}
      </style>
    </>
  );
};

export default PostCard;
