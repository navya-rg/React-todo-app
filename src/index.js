import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './assets/styles.css';
import AppHeader from './components/app-header.js';

const App = (
    <>
        <div id="bg-layers">
            <div class="bg-layer1"></div>
            <div class="bg-layer2"></div>
            <div class="bg-layer3"></div>
        </div>
        <div>
            <nav>
                <AppHeader />
            </nav>
            <section></section>
        </div>
    </>
); 

ReactDOM.render(App, document.getElementById('root'));