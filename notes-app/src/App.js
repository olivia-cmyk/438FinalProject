import './App.css';
import {useState, useEffect} from 'react';
import CardPreviewComponent from './CardPreviewComponent';


function App() {
  const [cards, setCards] = useState(
    [{id: 1, front: "Card front 1", back: "Card back 1"}])
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  function addCard() { //adds new cards to screen
    let currentL = cards.length + 1;

    //new card
    let newCard = [{id: currentL, 
      front: "Card front " + currentL, 
      back: "Card back " + currentL}]
    
    //create list of cards + new card
    const newCardsList = cards.concat(newCard);

    //replace old card list with new updated card list
    setCards(newCardsList);
    console.log("List of new cards: ", newCardsList);
  }

  useEffect(() => {
    if (cards.length > 0) {
      setCurrentCardIndex(cards.length - 1); // Set to the last card's index
    }
    console.log("Current card shown: ", cards.slice(-1));
  }, [cards]);


  function showNextCard() {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }

  function showPrevCard() {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
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
