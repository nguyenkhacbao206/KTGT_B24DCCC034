import { useParams, useNavigate } from "react-router-dom";
import { Post } from "../types/Post";

interface Props {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>; 
}

const PostDetail = ({ posts, setPosts }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));
  if (!post) return <p>Không tìm thấy bài viết</p>;

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts(posts.filter((p) => p.id !== post.id));
      navigate("/");
    }
  };

  return (
    <>
      <div className="post-detail">
        <h2>{post.title}</h2>
        <img src={post.image} alt={post.title} />
        <p><b>Tác giả:</b> {post.author}</p>
        <p><b>Ngày đăng:</b> {post.date}</p>
        <p><b>Thể loại:</b> {post.category}</p>
        <div className="content">{post.content}</div>

        <div className="actions">
          <button onClick={() => navigate("/")}>Quay lại</button>
          <button onClick={() => navigate(`/edit/${post.id}`)}>Chỉnh sửa</button>
          <button onClick={handleDelete}>Xóa bài viết</button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
