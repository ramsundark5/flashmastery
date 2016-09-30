import realm from '../database/Realm';

class CardDao{

    getCardsAsPlainObjects(realmCards){
        let customCards = [];
        realmCards.map(function(realmCard) {
            if (typeof realmCard.snapshot == 'function') {
                realmCard = realmCard.snapshot();
            } 
            let card = Object.assign({}, realmCard);
            customCards.push(card);
        });
        return customCards;
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

    getCardsAsPlainObjects(realmCards){
        let customCards = [];
        if(realmCards){
            realmCards.map(function(realmCard) {
                if (typeof realmCard.snapshot == 'function') {
                    realmCard = realmCard.snapshot();
                } 
                let card = Object.assign({}, realmCard);
                customCards.push(card);
            });
        }
        return customCards;
    }
}

export default new CardDao();