import realm from '../database/Realm';

class CardDao{

    getAllCardsForDeck(){

    }

    addNewCard(deck, card){
        realm.write(() => {
            let decksForId = realm.objectForPrimaryKey('Deck', deck.id);
            if(decksForId){
                decksForId.cards.push(card);
            }
        });
    }

    deleteCard(cardId){
        realm.write(() => {
            let cardToBeDeleted = realm.objectForPrimaryKey('Card', cardId);
            if(cardToBeDeleted){
                realm.delete(cardToBeDeleted);
            }
        });
    }

    updateCard(card){
        realm.write(() => {
            realm.create('Card', card, true);
        });
    }
}

export default new CardDao();