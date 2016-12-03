import realm from '../database/Realm';
import ReportDao from '../dao/ReportDao';

class PracticeService{

    getOnlyLearningCards(deck, user){
        let masteredAccuracy = 80;
        let masteredCards = [];
        let learningCards = [];
        for(let card of deck.cards){
            let isCardMastered = ReportDao.isCardMastered(card.id, user.id);
            if(isCardMastered){
                masteredCards.push(card);
            }else{
                learningCards.push(card);
            }
        }
        return {masteredCards: masteredCards, learningCards: learningCards};
    }
}

export default new PracticeService();