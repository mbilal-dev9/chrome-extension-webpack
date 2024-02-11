import {Navigate} from 'react-router-dom';
import {ROUTES} from './Routes';

const PrivateRoute = (props) => {
  const {children} = props;
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? children : <Navigate to={ROUTES.SIGN_IN} />;
}

export default PrivateRoute;