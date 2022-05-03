import { createStore } from 'redux';
import reducer from './reducers';

const configureStore = () => {
    const store = createStore(reducer);
    return store;
};


export default configureStore;