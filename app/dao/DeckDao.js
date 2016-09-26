import realm from '../database/Realm';
import uuid from 'react-native-uuid';

class DeckDao{
    getAllDeckSet(){
        /*realm.write(() => {
            realm.deleteAll();
        });*/
        let customDeckSets = [];
        let realmDeckSets = realm.objects('DeckSet');
        realmDeckSets.map(function(deckSet) {
            customDeckSets.push(deckSet);
        });
        return customDeckSets;
    }

    getAllDecks(){
        let customDecks = [];
        let realmDecks = realm.objects('Deck');
        realmDecks.map(function(deckSet) {
            customDecks.push(deckSet);
        });
        return customDecks;
    }

    getDeckSetForId(deckSetId){
        let deckSetForId = realm.objectForPrimaryKey('DeckSet', deckSetId);
        return deckSetForId;
    }

    addNewDeckSet(addedDeckSet){
        realm.write(() => {
            addedDeckSet.lastModified = new Date();
            addedDeckSet.custom = true;
            realm.create('DeckSet', addedDeckSet);
        });
    }

    addNewDeck(addedDeck){
        realm.write(() => {
            addedDeck.lastModified = new Date();
            addedDeck.custom = true;
            realm.create('Deck', addedDeck);
        });
    }

    deleteDeckSets(deckSetIds){
        realm.write(() => {
            for(let deckSetId of deckSetIds){
                let deckSetToBeDeleted = realm.objectForPrimaryKey('DeckSet', deckSetId);
                if(deckSetToBeDeleted){
                    realm.delete(deckSetToBeDeleted);
                }
            }
        });
    }

    deleteDecks(deckIds){
        realm.write(() => {
            for(let deckId of deckIds){
                let deckToBeDeleted = realm.objectForPrimaryKey('Deck', deckId);
                if(deckToBeDeleted){
                    realm.delete(deckToBeDeleted);
                }
            }
        });
    }
}
export default new DeckDao();