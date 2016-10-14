import realm from '../database/Realm';

class DeckDao{
    getAllDeckSet(){
        let customDeckSets = [];
        let realmDeckSets = realm.objects('DeckSet');
        realmDeckSets.map(function(realmDeckSet) {
            if (typeof realmDeckSet.snapshot == 'function') {
                realmDeckSet = realmDeckSet.snapshot();
            } 
            let deckSet = Object.assign({}, realmDeckSet);
            customDeckSets.push(deckSet);
        });
        return customDeckSets;
    }

    getDeckSetForId(deckSetId){
        let realmDeckSet = realm.objectForPrimaryKey('DeckSet', deckSetId);
        if (typeof realmDeckSet.snapshot == 'function') {
            realmDeckSet = realmDeckSet.snapshot();
        } 
        let deckSetForId = Object.assign({}, realmDeckSet);
        return deckSetForId;
    }

    addNewDeckSet(addedDeckSet){
        realm.write(() => {
            realm.create('DeckSet', addedDeckSet);
        });
    }

    updateDeckSet(deckSetToBeUpdated){
        if(!deckSetToBeUpdated.id){
            return;
        }
        realm.write(() => {
            realm.create('DeckSet', deckSetToBeUpdated, true);
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

    getDecksAsPlainObjects(realmDecks){
        let customDecks = [];
        realmDecks.map(function(realmDeck) {
            if (typeof realmDeck.snapshot == 'function') {
                realmDeck = realmDeck.snapshot();
            } 
            let deck = Object.assign({}, realmDeck);
            customDecks.push(deck);
        });
        return customDecks;
    }

    addNewDeck(deckSetId, addedDeck){
        realm.write(() => {
            let deckSetForId = realm.objectForPrimaryKey('DeckSet', deckSetId);
            if(deckSetForId){
                deckSetForId.decks.push(addedDeck);
            }else{
                //Alert('oops! something went wrong! please try again');
            }
        });
    }

    updateDeck(deckToBeUpdated){
        if(!deckToBeUpdated.id){
            return;
        }
        realm.write(() => {
            realm.create('Deck', deckToBeUpdated, true);
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