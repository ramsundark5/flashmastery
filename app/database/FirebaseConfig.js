import Firestack from 'react-native-firestack';

const configurationOptions = {
    databaseURL: "https://flashmastery.firebaseio.com/"
};
class FirebaseConfig{
    init(){
        this.firestack = new Firestack(configurationOptions);
        //this.firestack.on('debug', msg => console.log('Received debug message', msg));
        this.firestack.database.setPersistence(true);
        const basicFlashCardsRef = this.firestack.database
                        .ref('flashcards')
                        .child('basic');
        //basicFlashCardsRef.keepSynced(true);
    }
}

export default new FirebaseConfig();