import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
    return createStore(
        reducer,
        composeWithDevTools(applyMiddleware(thunk))
    )
}