import { createStore } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension'
const configureStore = () => {
    const store = createStore(reducer, composeWithDevTools());
    return store;
};


export default configureStore;