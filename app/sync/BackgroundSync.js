import * as firebase from 'firebase';

const firebaseConfig = {
  databaseURL: "<your-database-url>",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class BackgroundSync{

    init(){
        const rootRef = firebase.database().ref();
        const deckRef = rootRef.child('decks');
    }
}

export default new BackgroundSync();