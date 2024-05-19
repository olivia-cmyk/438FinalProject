import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';


function CardPreviewComponent({front, back, updateCard, cardId}) {
    const [isFlipped, setIsFlipped] = useState(false); //false = front, true = back
    const [currentFront, setFront] = useState(front)
    const [amEditingFront, setAmEditingFront] = useState(false); //false = not editing
    const [currentBack, setBack] = useState(back)
    const [amEditingBack, setAmEditingBack] = useState(false);


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
        updateCard(currentFront, currentBack, cardId);
        console.log("Front of card", cardId, "is updated in the array.")
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
        console.log("Back of card", cardId, "is updated in the array.")

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
                    className="input"
                    value={currentFront}
                    onChange={handleFrontChange}
                    onBlur={handleFrontBlur}
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