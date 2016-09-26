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
}
export default new DeckDao();