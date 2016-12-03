import * as firebase from 'firebase';
import DeckDao from '../dao/DeckDao';

const firebaseConfig = {
  databaseURL: "https://flashmastery.firebaseio.com/",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class BackgroundSync{

    init(){
        const rootRef = firebase.database().ref();
        const deckRef = rootRef.child('decks');
    }

    initSubscriptions(){
        deckRef.on('value', (deck) => {
            DeckDao.addOrUpdateDeck(deck);
        });
    }
}

export default new BackgroundSync();