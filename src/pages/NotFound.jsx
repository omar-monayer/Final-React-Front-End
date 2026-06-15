import { Link, useNavigate } from "react-router-dom";
import "../styles/notfound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card notfound-card text-center shadow-lg">
              <div className="card-body p-5">
                <span className="badge text-bg-info mb-3">404 Error</span>

                <h1 className="notfound-code">404</h1>

                <h2 className="notfound-title">Page Not Found</h2>

                <p className="notfound-text">
                  The page you are looking for does not exist or may have been moved.
                </p>

                <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                  <Link to="/login" className="btn btn-info px-4">
                    Go to Login
                  </Link>

                  <button
                    type="button"
                    className="btn btn-outline-light px-4"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center notfound-footer mt-3">
              Nexsus Admin Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;