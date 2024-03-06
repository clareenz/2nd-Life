/* So that the profile page cannot be accessed without logging in
 * start time: 4:54:15 (2nd vid)
 */
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isSeller, children }) => {
  if (!isSeller) {
    return <Navigate to={`/`} replace />;
  }
  return children;
};

export default SellerProtectedRoute;
