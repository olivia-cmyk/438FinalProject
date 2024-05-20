import './App.css';
import React from 'react';
import {useState} from 'react';
import axios from 'axios';


function CardPreviewComponent({front, back, updateCard, cardId, cards}) {
    const [isFlipped, setIsFlipped] = useState(false); //false = front, true = back
    const [currentFront, setFront] = useState(front)
    const [amEditingFront, setAmEditingFront] = useState(false); //false = not editing
    const [currentBack, setBack] = useState(back)
    const [amEditingBack, setAmEditingBack] = useState(false);

    //API variables
    const apiKey = process.env.REACT_APP_API_KEY;

    const handleCardClick = () => { //will trigger card to "flip" in css
        setIsFlipped(!isFlipped); //changes true->false and false->true
      };

    const handleDoubleClickFront = () => { //when doubleclick happens, trigger editing
        setAmEditingFront(true);
    }

    const handleFrontChange = (event) => { //when text on changes, set currentFront to changed text
        setFront(event.target.value);
    }

    const handleFrontBlur = () => { //when clicking out, exit editing mode.
        setAmEditingFront(false);
        updateCard(currentFront, currentBack, cardId); //saves 
        console.log("Front of card ", cardId, " is updated in the array.");
        console.log("handleFrontBlur: Cards Array: ", cards);
    }

    const handleDoubleClickBack = () => { //when doubleclick happens, trigger editing
        setAmEditingBack(true);
    }

    const handleBackChange = (event) => { //when text on changes, set currentBack to changed text
        setBack(event.target.value);
    }

    const handleBackBlur = () => { //when clicking out, exit editing mode.
        setAmEditingBack(false);
        updateCard(currentFront, currentBack, cardId);
        console.log("Back of card", cardId, "is updated in the array.");
        console.log("handleBackBlur: ", cards);
    }

    //API Handler Code:
    async function fetchKanji() {
        let urlBase = "https://kanjialive-api.p.rapidapi.com/api/public/search/";
        let searchTerm = currentFront.trim();
        let url = urlBase.concat(searchTerm);

        const options = {
            method: 'GET',
            url: url,
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
            }
          };
        try {
            const response = await axios(options); // Use axios directly here
            console.log("Fetched Data: ", response.data); // Log the response data (response.data, not response.data())
            let kanji = response.data[0]["kanji"]["character"];
            handleKanjiBackChange(kanji);
        } catch (error) {
            console.error('Error fetching data:', error);
            let errorMessage = "No kanji available. Try a simpler translation or different word.";
            handleKanjiBackChange(errorMessage);
        }
    
    }

    const handleKanjiBackChange = (kanji) => {
        setBack(kanji);
        updateCard(currentFront, kanji, cardId);
        console.log("handleKanjiBackChange for card ", cardId, "is updated in array.");
    }


    return(
    <div className="middle-container">
        {/* class name changes based on whether card flipped is true or false */}
        <div className="card-container">
            <div className={`flashcard ${isFlipped ? 'flipped':''}`}>
                <div className="card-front">
                    {/*will change front b/w input and actual text on double click*/}
                    {amEditingFront ?
                    (<input type="text"
                    id = "front-input"
                    className="input"
                    value={currentFront}
                    onChange={handleFrontChange}
                    onBlur={() => {handleFrontBlur(); fetchKanji();}}
                    autoFocus></input>)
                    : (<h3 onDoubleClick={handleDoubleClickFront}>{currentFront}</h3>)
                    }
                </div>
                <div className="card-back">
                    {/*will change back b/w input and actual text on double click*/}
                    {amEditingBack ?
                    (<input type="text"
                    className="input"
                    value={currentBack}
                    onChange={handleBackChange}
                    onBlur={handleBackBlur}
                    autoFocus></input>)
                    : (<h3 onDoubleClick={handleDoubleClickBack}>{currentBack}</h3>)
                    }
                </div>

            </div>
        </div>
        <button className="flip-card-button" onClick={handleCardClick}>Flip Card</button>
    </div>
    );
}
export default CardPreviewComponent;