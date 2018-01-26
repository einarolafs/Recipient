import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';


const MaterialApp = () => (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  );

ReactDOM.render(<MaterialApp />, document.getElementById('root'));
registerServiceWorker();
