import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export const ProtectedRoute = ({ isAllowed, requiredRole, children }) => {
  const userRole = useAuthStore(state => state.userRole);
  const location = useLocation();

  if (!isAllowed) return <Navigate to="/login" />;
  if (requiredRole && userRole !== requiredRole) return <Navigate to={location.pathname} />;

  return children ? <>{children}</> : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  requiredRole: PropTypes.string,
  children: PropTypes.node,
};
