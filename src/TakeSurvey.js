import React from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import  { useState } from 'react';
import './App.css';
import { db } from './firebaseConfig';



const TakeSurvey = () => {

  const [surname, setSurname] = useState('');
  const [firstNames, setFirstNames] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [ratings, setRatings] = useState([]);
  
  


    const surveyStyles = {
        fontSize: '20px',
        fontWeight: 'normal',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'left',
    };

    

  

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


   

   

    const handleFoodSelection = (event) => {
        const selectedFood = event.target.value;
        if (event.target.checked) {
            setFavoriteFoods([...favoriteFoods, selectedFood]);
        } else {
            setFavoriteFoods(favoriteFoods.filter(food => food !== selectedFood));
        }
    };

   


    

    const handleRatingChange = (index, value) => {
        const newRatings = [...ratings];
        newRatings[index] = value;
        setRatings(newRatings);
    }
   


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const ageNumber = parseInt(age);
        

        
        const formData = {
            surname,
            firstNames,
            contactNumber,
            age:ageNumber,
            selectedDate,
            favoriteFoods,
            ratings: ratings.map(Number),
        };
        formData.favoriteFoods = favoriteFoods;
        
        db.collection('surveys')
            .add(formData)
            .then((docRef) => {
                console.log('Data written to Firestore with ID: ', docRef.id);

                setSurname('');
                setFirstNames('');
                setContactNumber('');
                setAge('');
                setSelectedDate(null);
                setFavoriteFoods([]);
                setRatings([]);
                navigate('/');

            })
            .catch((error) => {
                console.error('Error writing data to Firestore: ', error);
            });
    }
  
   
   


    return (
        <form id="survey-form" className="container" onSubmit={handleFormSubmit}>
     <div className="container">
     <h1 style={surveyStyles}>Take our survey</h1>
         <label>
           Personal details:
       </label>
       <div style={{ marginBottom: '20px' }}></div>
         <div className="form-group">
                <label htmlFor="surname">Surname </label>
         <div className="input-container">
                   <input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
         </div>
         </div>
            <div className="form-group">
                <label htmlFor="first-names">First Names </label>
                <div className="input-container">
                        <input type="text" id="first-names" value={firstNames} onChange={(e) => setFirstNames(e.target.value)} />  
            </div>
            </div>
                   <div className="form-group">
                    <label htmlFor="contact-number">Contact Number </label>
                    <div className="input-container">
                        <input type="text" id="contact-number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                   </div>
                   </div>
                             <div className="form-group">
                <label htmlFor="date">Date </label>
                <div className="date-container">
                <DatePicker
                    id="date"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a date"/>
                             </div>
                                      <div className="form-group">
                            <label htmlFor="age">Age </label>
                            <div className="input-container">
                            <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                                       </div>
            </div>
            <div>
                <label>
                    What is your favorite food? (You can choose more than one answer)
                </label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Pizza"
                            checked={favoriteFoods.includes('Pizza')}
                            onChange={handleFoodSelection}
                        />
                        Pizza
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Pasta"
                            checked={favoriteFoods.includes('Pasta')}
                            onChange={handleFoodSelection}
                        />
                        Pasta
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Pap and Wors"
                            checked={favoriteFoods.includes('Pap and Wors')}
                            onChange={handleFoodSelection}
                        />
                        Pap and Wors
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Chicken stir fry"
                            checked={favoriteFoods.includes('Chicken stir fry')}
                            onChange={handleFoodSelection}
                        />
                        Chicken stir fry
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Beef stir fry"
                            checked={favoriteFoods.includes('Beef stir fry')}
                            onChange={handleFoodSelection}
                        />
                        Beef stir fry
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Other"
                            
                            onChange={handleFoodSelection}
                        />
                        Other
                    </label>
                </div>
                </div>
                <div style={{ marginBottom: '20px' }}></div>

            <div>
              <label>
                        On a scale of 1 to 5 indicate whether you strongly agree to strongly disagree
                </label>
                </div>
                <table className="survey-table">
                <thead>
                    <tr>
                        <th>Options</th>
                        <th>Strongly Agree</th>
                        <th>Agree</th>
                        <th>Neutral</th>
                        <th>Disagree</th>
                        <th>Strongly Disagree</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>I like to eat out</td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={5}
                                    checked={ratings[0] === 5}
                                    onChange={() => handleRatingChange(0, 5)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={4}
                                    checked={ratings[0] === 4}
                                    onChange={() => handleRatingChange(0, 4)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={3}
                                    checked={ratings[0] === 3}
                                    onChange={() => handleRatingChange(0, 3)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={2}
                                    checked={ratings[0] === 2}
                                    onChange={() => handleRatingChange(0, 2)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={ratings[0] === 1}
                                    onChange={() => handleRatingChange(0, 1)}
                                />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>I like to watch movies</td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={5}
                                    checked={ratings[1] === 5}
                                    onChange={() => handleRatingChange(1, 5)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={4}
                                    checked={ratings[1] === 4}
                                    onChange={() => handleRatingChange(1, 4)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={3}
                                    checked={ratings[1] === 3}
                                    onChange={() => handleRatingChange(1, 3)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={2}
                                    checked={ratings[1] === 2}
                                    onChange={() => handleRatingChange(1, 2)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={ratings[1] === 1}
                                    onChange={() => handleRatingChange(1, 1)}
                                />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>I like to watch TV</td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={5}
                                    checked={ratings[2] === 5}
                                    onChange={() => handleRatingChange(2, 5)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={4}
                                    checked={ratings[2] === 4}
                                    onChange={() => handleRatingChange(2, 4)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={3}
                                    checked={ratings[2] === 3}
                                    onChange={() => handleRatingChange(2, 3)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={2}
                                    checked={ratings[2] === 2}
                                    onChange={() => handleRatingChange(2, 2)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={ratings[2] === 1}
                                    onChange={() => handleRatingChange(2, 1)}
                                />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>I like to listen to the radio</td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={5}
                                    checked={ratings[3] === 5}
                                    onChange={() => handleRatingChange(3, 5)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={4}
                                    checked={ratings[3] === 4}
                                    onChange={() => handleRatingChange(3, 4)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={3}
                                    checked={ratings[3] === 3}
                                    onChange={() => handleRatingChange(3, 3)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={2}
                                    checked={ratings[3] === 2}
                                    onChange={() => handleRatingChange(3, 2)}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={ratings[3] === 1}
                                    onChange={() => handleRatingChange(3, 1)}
                                />
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Submit</button>
           </div>
          </form>

    );
};

export default TakeSurvey;
