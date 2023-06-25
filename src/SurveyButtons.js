import React from 'react';
import {  useNavigate } from 'react-router-dom';




const SurveyButtons = () => {


    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };


    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',
        background: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    };

    const welcomeLabelStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    };


    const navigate = useNavigate();

    return (
        
        <div style={buttonContainerStyle} >
           <h1 style={welcomeLabelStyle}>WELCOME</h1>
           < button style={buttonStyle} onClick={() => navigate("/take-survey")}>Take  Survey
                
                    
            </button>
               
            
            <button style={buttonStyle} onClick={() => navigate("/view-results")} >View results

              </button>
      </div>           
            );
}

            export default SurveyButtons;

    
  
