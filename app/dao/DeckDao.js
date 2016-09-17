import realm from '../database/Realm';
import uuid from 'react-native-uuid';

class DeckDao{
    getAllDeckSet(){
        let deckSet = realm.objects('DeckSet').snapshot();
        return deckSet;
    }

    getDeckSetForId(deckSetId){
        let deckSetForId = realm.objects('DeckSet').objectForPrimaryKey('id = $0', deckSetId);
        return deckSetForId;
    }

    addNewDeckSet(deckSetName){
        realm.write(() => {
            realm.create('DeckSet', {id: uuid.v1() ,name: deckSetName});
        });
    }
}
export default new DeckDao();