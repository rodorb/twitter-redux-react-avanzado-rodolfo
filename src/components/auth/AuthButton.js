import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { authLogout } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

function AuthButton({ className }) {
  //Hook que hace que el componente se renderice cada vez que hay un cambio en la parte del estado que indico
  //en este caso cada vez que cambie state.auth
  const isLogged = useSelector(getIsLogged);
  
  //Hook que devuelve el método dispatch para disparar acciones sobre el store de redux
  const dispatch = useDispatch();
  const handleLogoutClick = async () => {
    dispatch(authLogout());
  };

  return isLogged ? (
    <Button className={className} onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" variant="primary" className={className}>
      Login
    </Button>
  );
}

export default AuthButton;
