import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import './assets/styles.css';
import AppBaseStructure from './components/app-base-structure.js';

const App = (
    <>
        <div id="bg-layers">
            <div className="bg-layer1"></div>
            <div className="bg-layer2"></div>
            <div className="bg-layer3"></div>
        </div>
        <div>
            <AppBaseStructure />
        </div>
    </>
); 

ReactDOM.render(App, document.getElementById('root'));