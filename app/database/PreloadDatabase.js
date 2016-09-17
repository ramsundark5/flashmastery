import uuid from 'react-native-uuid';
import realm from './Realm';
import {LocalDatabase} from './LocalDatabase';

class PreloadDatabase{
    init(){
        realm.write(() => {
            let deckSetIds = Object.keys(LocalDatabase);
            for(let deckSetId of deckSetIds){
                this._preloadDeckSets(deckSetId);
            }
        });
    }

    _preloadDeckSets(deckSetId){
        let deckSetToBePreloaded = LocalDatabase[deckSetId];
        let realmDeckSet = this._createDeckSetIfNotFound(deckSetId, deckSetToBePreloaded.name);
        
        for(let deck of deckSetToBePreloaded){
            this._addDeckToSetIfNotFound(deck, realmDeckSet);
            //realmDeckSet.push(deck);
        }
    }

/*    _createEmptyDeckSet(deckSetName){
        let realmDeckSet = realm.create('DeckSet', { 
                                    id: uuid.v1(), 
                                    name: deckSetName,
                                    decks: [],
                                    lastModified: new Date()
                                  });
        return realmDeckSet;
    }*/
    _createDeckSetIfNotFound(deckSetId, deckSetName){
        let realmDeckSet = realm.objects('DeckSet').objectForPrimaryKey('id = $0', deckSetId);
        if(!realmDeckSet){
            realmDeckSet = realm.create('DeckSet', { 
                                    id: deckSetId, 
                                    name: deckSetName,
                                    decks: [],
                                    lastModified: new Date()
                                  });
        }
        return realmDeckSet;
    }

    _addDeckToSetIfNotFound(deck, realmDeckSet){
        let realmDeck = realm.objects('Deck').objectForPrimaryKey('id = $0', deck.id);
        if(!realmDeck){
            console.log('list is '+JSON.stringify(realmDeck));
            realmDeckSet.decks.push(deck);
        }
    }
}

export default new PreloadDatabase();