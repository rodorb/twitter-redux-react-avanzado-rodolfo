import { Provider } from "react-redux"
import { BrowserRouter as Router } from 'react-router-dom';

export const Root = ({ children, store })=>{
    return (
    <Provider store={store}>
        <Router>{children}</Router>
    </Provider>)
}