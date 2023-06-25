
import React from 'react';
import './survy.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SurveyButtons from './SurveyButtons';
import TakeSurvey from './TakeSurvey';
import ViewResults from './ViewResults';

const App = () => {

    
        const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
        };


    

    return (
        <Router>
        <div style = { containerStyle } >       
            <Routes>
                <Route exact path="/" element={<SurveyButtons/>} />
                <Route path="/take-survey" element={<TakeSurvey/>} />
                <Route path="/view-results" element={<ViewResults/> } />
            </Routes>
            </div>

        </Router>
    );
};



export default App;
  
