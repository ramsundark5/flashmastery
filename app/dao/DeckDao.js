import realm from '../database/Realm';

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

    getDeckSetForId(deckSetId){
        let deckSetForId = realm.objectForPrimaryKey('DeckSet', deckSetId);
        return deckSetForId;
    }

    addNewDeckSet(addedDeckSet){
        realm.write(() => {
            realm.create('DeckSet', addedDeckSet);
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

    getAllDecks(){
        let customDecks = [];
        let realmDecks = realm.objects('Deck');
        realmDecks.map(function(deckSet) {
            customDecks.push(deckSet);
        });
        return customDecks;
    }

    addNewDeck(deckSetId, addedDeck){
        realm.write(() => {
            let deckSetForId = realm.objectForPrimaryKey('DeckSet', deckSetId);
            if(deckSetForId){
                deckSetForId.decks.push(addedDeck);
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