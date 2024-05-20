import './App.css';
import {useState} from 'react';
import CardPreviewComponent from './CardPreviewComponent';


function App() {
  //states:
  const [cards, setCards] = useState(
    [{id: 1, front: "Card front 1", back: "Card back 1"}])
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  //adds new cards to cards array
  function addCard() {
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
    console.log("updatedCards called: ", updatedCards);
  }  

  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">
          <h3>日本語漢字のフラッシュカード</h3>
          <p>Give simple nouns to get automatic kanji translation (ex. cat, ocean, sun). Double click to make your own edits.</p>
        </div>
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
            cards={cards}
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
