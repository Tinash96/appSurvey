import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';

const ViewResults = () => {
    const navigate = useNavigate();
    const [totalSurveys, setTotalSurveys] = useState(0);
    const [averageAge, setAverageAge] = useState(0);
    const [maxAge, setMaxAge] = useState(0);
    const [minAge, setMinAge] = useState(0);
    const [papWorsPercentage, setPapWorsPercentage] = useState(0);
    const [averageRatings, setAverageRatings] = useState([]);
    const [pizzaPercentage, setPizzaPercentage] = useState(0);
    const [pastaPercentage, setPastaPercentage] = useState(0);

    const surveyStyles = {
        fontSize: '20px',
        fontWeight: 'normal',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'left',
    };




   

    const countDocuments = async () => {
        try {
            const collectionRef = db.collection('surveys');
            const snapshot = await collectionRef.get();
            const count = snapshot.size;

            console.log('Total number of documents:', count);
            setTotalSurveys(count);
        } catch (error) {
            console.error('Error counting documents:', error);
        }
    };

    useEffect(() => {
        countDocuments();
        calculateAverageMinMaxAge();
    }, []);
    

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const snapshot = await db.collection('surveys').get();
                const data = snapshot.docs.map((doc) => doc.data());
                

                
                const totalSurveys = data.length;
                const pizzaCount = data.reduce((count, survey) => {
                    if (survey.favoriteFoods.includes('Pizza')) {
                        return count + 1;
                    }
                    return count;
                }, 0);

                const pastaCount = data.reduce((count, survey) => {
                    if (survey.favoriteFoods.includes('Pasta')) {
                        return count + 1;
                    }
                    return count;
                }, 0);

                const WorsCount = data.reduce((count, survey)=> {

                   if (survey.favoriteFoods.includes('Pap and Wors')) {
                   return count + 1;

                   }
                   return count;
                }, 0);

                const perc =( (WorsCount / totalSurveys) * 100).toFixed(1);
                setPapWorsPercentage(perc)


                const percentage = ((pizzaCount / totalSurveys) * 100).toFixed(1);
                setPizzaPercentage(percentage);

                const percent =( (pastaCount / totalSurveys) * 100).toFixed(1);
                setPastaPercentage(percent);

            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        fetchSurveyData();
    }, []);

              const calculateAverageMinMaxAge = async () => {
              try {
              const collectionRef = db.collection('surveys');
              const snapshot = await collectionRef.get();
              const docs = snapshot.docs;
              let totalAge = 0;
              let maxAge = 0;
              let minAge = Infinity;

               docs.forEach((doc) => {
                const age = doc.data().age;
                totalAge += age;
                if (age > maxAge) {
                    maxAge = age;
                }
                if (age < minAge) {
                    minAge = age;
                }
            });

              const averageAge = totalAge / docs.length;
 
              console.log('Average age:', averageAge);
              console.log('Maximum age:', maxAge);
              console.log('Minimum age:', minAge);

              setAverageAge(averageAge.toFixed(3));
              setMaxAge(maxAge);
              setMinAge(minAge);
        } catch (error) {
            console.error('Error calculating average, maximum, and minimum age:', error);
        }
    };

    useEffect(() => {
        const fetchSurveyResults = async () => {
            try {
                const snapshot = await db.collection('surveys').get();
                const surveyData = snapshot.docs.map((doc) => doc.data());

               
                const ratings = [
                    'I like to eat out',
                    'I like to watch movies',
                    'I like to watch TV',
                    'I like to listen to the radio',
                ];

                const averageRatings = ratings.map((statement) => {
                    const ratingsForStatement = surveyData.map((person) => person.ratings[statement]);
                    const totalRatings = ratingsForStatement.length;
                    const sumRatings = ratingsForStatement.reduce((a, b) => a + b, 0);
                    const averageRating = sumRatings / totalRatings;

                    return {
                        statement,
                        averageRating: averageRating.toFixed(2),
                    };
                });

                
               
                setAverageRatings(averageRatings);
            } catch (error) {
                console.error('Error fetching survey results:', error);
            }
        };

        fetchSurveyResults();
    }, []);

    
           

        return (
            <div style={{ position: 'fixed', top: '0', left: '0', padding: '20px' }}>
                <h1 style={surveyStyles}>Survey Results:</h1>
                <div>
                    <label htmlFor="Total">Total number of surveys: {totalSurveys}</label>
                </div>
                <div>
                    <label htmlFor="age">Average age: {averageAge}</label>
                </div>
                <div>
                    <label htmlFor="oldest">Oldest person who participated in survey: {maxAge}</label>
                </div>
                
                <div>
                    <label htmlFor="youngest">Youngest person who participated in survey: {minAge}</label>
                </div>
                <div style={{ marginBottom: '20px' }}></div>
                <div>
                    <label htmlFor="pizza">People who like pizza:{pizzaPercentage}%</label>
                </div>
                <div>
                    <label htmlFor="Pasta">People who like pasta:{pastaPercentage}%</label>
                </div>
                <div>
                    <label htmlFor="Pap and Wors">People who like Pap and Wors:{papWorsPercentage}%</label>
                </div>
                <div style={{ marginBottom: '20px' }}></div>
                <div>
                    <label htmlFor="eat out">People who like to eat out:{averageRatings.find((item) => item.statement === 'I like to eat out')?.averageRatings || 0}</label>
                    

                  </div>
                <div>
                    <label htmlFor="watch movies">People who like to watch movies:{averageRatings.find((item) => item.statement === 'I like to watch movies')?.averageRatings || 0}</label>
                    
                </div>
                <div>
                    <label htmlFor="watch tv">People who like to watch TV:{averageRatings.find((item) => item.statement === 'I like to watch TV')?.averageRatings || 0}</label>
                </div>
                <div>
                    <label htmlFor="radio">People who like to listen to the radio:{averageRatings.find((item) => item.statement === 'I like to listen to the radio')?.averageRatings || 0}</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
                        OK
                    </button>
                </div>
            </div>
         );
    };

export default ViewResults;
