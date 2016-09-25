import realm from '../database/Realm';
import uuid from 'react-native-uuid';

class DeckDao{
    getAllDeckSet(){
        let customDeckSets = [];
        let realmDeckSets = realm.objects('DeckSet');
        realmDeckSets.map(function(deckSet) {
            customDeckSets.push(deckSet);
        });
        return customDeckSets;
    }

    getDeckSetForId(deckSetId){
        let deckSetForId = realm.objects('DeckSet').objectForPrimaryKey('id = $0', deckSetId);
        return deckSetForId;
    }

    addNewDeckSet(addedDeckSet){
        realm.write(() => {
            addedDeckSet.lastModified = new Date();
            addedDeckSet.custom = true;
            realm.create('DeckSet', addedDeckSet);
        });
    }
}
export default new DeckDao();