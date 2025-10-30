import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <h3>Blog Demo</h3>
        <div className="links">
          <Link to="/">Trang chủ</Link>
          <Link to="/create">Tạo bài</Link>
        </div>
      </nav>

      <style>
        {`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #e5e5e5;
          padding: 8px 15px;
          border-bottom: 1px solid #999;
          font-family: Arial, sans-serif;
        }

        .navbar h3 {
          margin: 0;
          font-size: 18px;
        }

        .navbar .links {
          display: flex;
          gap: 10px;
        }

        .navbar a {
          text-decoration: none;
          color: #333;
          border: 1px solid #666;
          padding: 3px 8px;
        }

        .navbar a:hover {
          background: #ddd;
        }
        `}
      </style>
    </>
  );
};

export default Navbar;
