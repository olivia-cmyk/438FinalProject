import './App.css';
import {useState, useEffect} from 'react';
import CardPreviewComponent from './CardPreviewComponent';
import {collection, addDoc, getDocs, updateDoc, doc, query, where} from "firebase/firestore";
import {db, auth} from './firebase';
import {useNavigate} from "react-router-dom";
import {onAuthStateChanged, signOut} from 'firebase/auth';



function Home() {
  //firebase:
  let dbName = "flashcards" //name of database in firestore

  //router:
  const navigate = useNavigate();

  //states:
  const [cards, setCards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [user, setUser] = useState(null);

  //user logging in:
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) { //if user is logged in
        setUser(user);
        console.log("User logged in: ", user.email);
      } else { //no user logged in
        setUser(null);
        console.log("No user logged in... sending to login page.");
        navigate("/login");
      }
    });
  }, [navigate]);

  //user signing out:
  function handleSignOut() {
    signOut(auth).then(() => {
      console.log("Sign out successful.");
      navigate("/login");
    }).catch((e) => {
      console.error("Error signing out: ", e);
    });
  }


  //Add Card:
  async function addCard() {
    let currentL = cards.length + 1;
    try {
      const docRef = await addDoc(collection(db, dbName), { //add new card to database
        id: currentL,
        front: "Card front " + currentL, 
        back: "Card back " + currentL,
        fireNoteId: "",
        userId: user.uid
      })
      console.log("New Card Added to Firestore: ", docRef.id);

      //Add the firenoteid to the actual data
      const docCreated = doc(db, dbName, docRef.id); //var for new card created
      await updateDoc(docCreated, {fireNoteId: docRef.id})

      //defining new card
      let newCard = [{
        id: currentL, 
        front: "Card front " + currentL, 
        back: "Card back " + currentL,
        fireNoteId: docRef.id,
        userId: user.uid}]

      //concats and sets cards to include new card
      const newCardsArray = cards.concat(newCard);
      setCards(newCardsArray);
      setCurrentCardIndex(newCardsArray.length - 1); //Jumps to most recent card
      (console.log("List of new cards: ", newCardsArray));
    } catch(e) {
      console.log("Error adding new note: ", e);
    }
  }

  //
  async function fetchCardsFromDb() {
    try {
      if (user===null) {
        console.log("User is null. Will not fetch data.");
      } else {
        console.log("Fetching data ...", user.uid);
        const cardsCollectionQuerySnap = await getDocs(query(collection(db, dbName), where("userId", "==", user.uid)));
        const fetchedCards = cardsCollectionQuerySnap.docs.map((card) => ({id: card.id, ...card.data()}));
        setCards(fetchedCards);
        console.log("Cards successfully fetched.");
      }
    } catch(e) {
      console.error ("Error fetching flashcards from firestore: ", e);
    }
  }

  useEffect(() => {
    fetchCardsFromDb();
  }, [user]); // Will only run once


  function showNextCard() {
    //sets current card index to be current index + 1
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }

  function showPrevCard() {
      //sets current card index to be current index - 1
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  }

  async function updateCard(newFront, newBack, cardId, fireNoteId, userId) {
    console.log("Updating cards...");
    try {
      const docRef = doc(db, dbName, fireNoteId);
      await updateDoc(docRef, {
        front: newFront,
        back: newBack
      });

      //if card.id = cardId, return updated card. else, return original card.
      const updatedCards = cards.map((card) => {
        return (card.id === cardId) ?
        { ...card, front: newFront, back: newBack, fireNoteId: fireNoteId, userId: userId} : card;
        });
      setCards(updatedCards); //update cards
      console.log("updatedCards called: ", updatedCards);
    } catch(e) {
      console.error("Error updating notes: ", e);
    }
  }  

  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">
          <h3 className="heading-text">日本語漢字のフラッシュカード</h3>
          <p className="heading-text">Give simple nouns to get automatic kanji translation (ex. cat, ocean, sun). Double click to make your own edits.</p>
        </div>
        <button className="Add-button" onClick={addCard}>+</button>
        <button className="Add-button" onClick={handleSignOut}>Sign out</button>
      </header>
      <main className="App-main">
        <div className="arrow-container">
          <button className="arrow" onClick={showPrevCard}>◄</button>
        </div>
        {cards.length > 0 && (
          <CardPreviewComponent
            key={cards[currentCardIndex].id}
            front={cards[currentCardIndex].front}
            back={cards[currentCardIndex].back}
            cardId={cards[currentCardIndex].id}
            updateCard={updateCard}
            cards={cards}
            fireNoteId={cards[currentCardIndex].fireNoteId}
            userId={cards[currentCardIndex].userId}
          />
        )}
        <div className="arrow-container">
          <button className="arrow" onClick={showNextCard}>►</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
