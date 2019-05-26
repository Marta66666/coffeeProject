import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {ContextProvider} from "./Context/Context";


ReactDOM.render(<ContextProvider><App /></ContextProvider>, document.getElementById('root'));

serviceWorker.unregister();
