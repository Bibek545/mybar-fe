// import React from "react";
// import LoginPage from "./LoginPage.jsx";
// import SignUpPage from "./SignUpPage.jsx";
// import { Link } from "react-router-dom";

// const BeMember = () => {
//   return (
//     <div className="d-flex justify-content-center">
//       <div className="member-container card p-5 mt-5 shadow-lg mb-5">
//         <div className="login-section">
//           <h6 className="text-center">
//             Already have an account? <Link to="/login">Login</Link> here
//           </h6>
//         </div>
//         <div className="signup-section">
//           <h6 className="text-center">
//             Don't have the account? <Link to="/signup">Sign Up</Link> here
//           </h6>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BeMember;

import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const BeMember = () => {
  return (
    <div className="member-bg min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0 shadow-lg member-glass" style={{ maxWidth: 760 }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Member Hub</h2>
            <p className="text-muted mb-0">
              Book tables, earn perks, and get member‑only offers at <span className="fw-semibold">The Hidden Pour</span>.
            </p>
          </div>

          <div className="row g-3 g-md-4">
            {/* Login */}
            <div className="col-md-6">
              <div className="h-100 p-4 rounded-4 border member-tile">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center me-2"
                       style={{ width: 36, height: 36 }}>
                    <FaSignInAlt aria-hidden="true" />
                  </div>
                  <h5 className="mb-0">Already a member?</h5>
                </div>
                <p className="text-muted small mb-3">
                  Pick up where you left off and manage your bookings.
                </p>
                <Link className="btn btn-thp w-100 py-2" to="/login">
                  <FaSignInAlt className="me-2" /> Log in
                </Link>
              </div>
            </div>

            {/* Sign up */}
            <div className="col-md-6">
              <div className="h-100 p-4 rounded-4 border member-tile">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center me-2"
                       style={{ width: 36, height: 36 }}>
                    <FaUserPlus aria-hidden="true" />
                  </div>
                  <h5 className="mb-0">New here?</h5>
                </div>
                <p className="text-muted small mb-3">
                  Create an account to unlock member discounts and faster checkout.
                </p>
                <Link className="btn btn-thp-outline w-100 py-2" to="/signup">
                  <FaUserPlus className="me-2" /> Sign up
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-muted mt-4 small">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeMember;
