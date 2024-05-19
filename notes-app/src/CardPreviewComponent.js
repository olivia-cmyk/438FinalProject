import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';


function CardPreviewComponent({front, back, cardId}) {
    const [isFlipped, setIsFlipped] = useState(false); //false = front, true = back

    const handleCardClick = () => {
        setIsFlipped(!isFlipped); //changes true->false and false->true
      };


    return(
    <div className="card-container">
        {/* class name changes based on whether card flipped is true or false */}
        <div className={`flashcard ${isFlipped ? 'flipped':''}`} onClick={handleCardClick}>
            <div className="card-front">
                <h3>{front}</h3>
            </div>
            <div className="card-back">
                <h3>{back}</h3>
            </div>
        </div>
    </div>
    );
}
export default CardPreviewComponent;