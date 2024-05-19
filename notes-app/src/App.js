import './App.css';
import {useState, useEffect} from 'react';
import CardPreviewComponent from './CardPreviewComponent';


function App() {
  const [cards, setCards] = useState(
    [{id: 1, front: "Card front 1", back: "Card back 1"}])
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  function addCard() { //adds new cards to screen
    let currentL = cards.length + 1;

    //defining new card
    let newCard = [{id: currentL, 
      front: "Card front " + currentL, 
      back: "Card back " + currentL}]
    
    //create list of cards + new card
    const newCardsList = cards.concat(newCard);

    //replace old card list with new updated card list
    setCards(newCardsList);
    setCurrentCardIndex(newCardsList.length - 1); // Jump to the most recent card
    console.log("List of new cards: ", newCardsList);
  }
  

  function showNextCard() {
    //sets current card index to be current index + 1
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }

  function showPrevCard() {
      //sets current card index to be current index - 1
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  }

  function updateCard(newFront, newBack, cardId) {
    const updatedCards = cards.map((card) => {
      //if card.id = cardId, return updated card. else, return original card.
      return (card.id === cardId) ? { ...card, front: newFront, back: newBack } : card;
    });
    setCards(updatedCards); //update cards
  }  

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="Title">日本語のフラッシュカード</h3>
        <button className="Add-button" onClick={addCard}>+</button>
      </header>
      <main className="App-main">
        <div className="arrow-container">
          <button className="arrow" onClick={showPrevCard}>&lt;</button>
        </div>
        {cards.length > 0 && (
          <CardPreviewComponent
            key={cards[currentCardIndex].id}
            front={cards[currentCardIndex].front}
            back={cards[currentCardIndex].back}
            cardId={cards[currentCardIndex].id}
            updateCard={updateCard}
          />
        )}
        <div className="arrow-container">
          <button className="arrow" onClick={showNextCard}>&gt;</button>
        </div>
      </main>
    </div>
  );
}

export default App;
