import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
//import { useAuthStore } from '../store/auth';

export const ProtectedRoute = ({ isAllowed, children }) => {
  //const userRole = useAuthStore(state => state.userRole);
  //const location = useLocation();
  //manejo si no esta registrado
  if (!isAllowed) return <Navigate to="/usuario" />;
  //if (requiredRole && userRole !== requiredRole) return <Navigate to={location.pathname} />;
  //un children es un solo componente si envuelvo a mas de uno ya es un outlet 
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  requiredRole: PropTypes.string,
  children: PropTypes.node,
};
