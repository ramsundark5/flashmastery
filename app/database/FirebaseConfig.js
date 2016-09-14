import Firestack from 'react-native-firestack';

const configurationOptions = {
    databaseURL: "https://flashmastery.firebaseio.com/"
};
class FirebaseConfig{
    async init(){
        this.firestack = await new Firestack(configurationOptions);
        //this.firestack.on('debug', msg => console.log('Received debug message', msg));
        await this.firestack.database.setPersistence(true);
        const basicFlashCardsRef = this.firestack.database
                        .ref('flashcards')
                        .child('basic');
        this.basicFlashCardRef = basicFlashCardsRef;
        //await basicFlashCardsRef.keepSynced(true);
    }

    getBasicFlashCardRef(){
        return this.basicFlashCardRef;
    }
}

export default new FirebaseConfig();