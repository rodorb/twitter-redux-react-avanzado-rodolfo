import T from 'prop-types';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsLogged } from '../../store/selectors';

const RequireAuth = ({ isLogged, children }) => {
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

RequireAuth.propTypes = {
  isLogged: T.bool,
  children: T.node,
};

const mapStateToProps = (state)=>{
  return {
    isLogged: getIsLogged(state),
  }
}

//connect devuelve otra funcion a la que le paso el componente
//que quiero conectar a Redux
const ConectedRequireAuth = connect( 
  mapStateToProps,
  // mapDispatchToProps 
)(RequireAuth);


// const ConectedRequireAuth = props => (
//   <AuthContextConsumer>
//     {({ isLogged }) => <RequireAuth isLogged={isLogged} {...props} />}
//   </AuthContextConsumer>
// );

// const ConectedRequireAuth = props => {
//   const { isLogged } = useContext(AuthContext);

//   return <RequireAuth isLogged={isLogged} {...props} />;
// };

export default ConectedRequireAuth;
