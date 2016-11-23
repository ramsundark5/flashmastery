import realm from '../database/Realm';
import ReportDao from '../dao/ReportDao';

class PracticeService{

    getOnlyLearningCards(deck, user){
        let masteredAccuracy = 80;
        let masteredCards = [];
        let practiceCards = [];
        for(let card of deck.cards){
            let isCardMastered = ReportDao.isCardMastered(card.id, user.id);
            if(isCardMastered){
                masteredCards.push(card);
            }else{
                practiceCards.push(card);
            }
        }
        return {masteredCards: masteredCards, practiceCards: practiceCards};
    }
}

export default new PracticeService();