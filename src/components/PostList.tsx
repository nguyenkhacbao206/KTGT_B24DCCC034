import { useState } from "react";
import { Post } from "../types/Post";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

interface Props {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostList = ({ posts, setPosts }: Props) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="post-list">
        <div className="header">
          <h2>Danh sách bài viết</h2>
          <div className="controls">
            <input
              placeholder="Tìm kiếm..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            {/* <button onClick={() => navigate("/create")}>Thêm bài</button> */}
          </div>
        </div>

        <div className="grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      <style>
        {`
        .post-list {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .controls input {
          padding: 5px;
          border: 1px solid #999;
        }

        .controls button {
          margin-left: 5px;
          padding: 6px 10px;
          border: 1px solid #333;
          background: #eee;
          cursor: pointer;
        }

        .controls button:hover {
          background: #ddd;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
        }
        `}
      </style>
    </>
  );
};

export default PostList;
