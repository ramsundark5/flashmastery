import realm from '../database/Realm';
import uuid from 'react-native-uuid';

class PracticeDao{

    getAllPracticeSession(userId){
        let practiceSessions = [];
        let realmPracticeSessions = realm.objects('PracticeSession').filtered('user = $0', userId);
        realmPracticeSessions.map(function(realmPracticeSession) {
            if (typeof realmPracticeSession.snapshot == 'function') {
                realmPracticeSession = realmPracticeSession.snapshot();
            } 
            let practiceSession = Object.assign({}, realmPracticeSession);
            practiceSessions.push(practiceSession);
        });
        return practiceSessions;
    }

    getPracticeSessionsForDeck(deckId, userId){
        console.log('realm path '+realm.path);
        let practiceSessions = [];
        let realmPracticeSessions = realm.objects('PracticeSession').filtered('deckId = $0 AND user = $1', deckId, userId);
        realmPracticeSessions.map(function(realmPracticeSession) {
            if (typeof realmPracticeSession.snapshot == 'function') {
                realmPracticeSession = realmPracticeSession.snapshot();
            } 
            let practiceSession = Object.assign({}, realmPracticeSession);
            practiceSessions.push(practiceSession);
        });
        return practiceSessions;
    }

    createPracticeSession(deck, user, verifiedBy){
        let newPracticeSession = {
            id: uuid.v1(), 
            user: user.id, 
            verifiedBy: verifiedBy ? verifiedBy.id : 'guest', 
            deckId: deck.id,
            results: [],
            lastModified: new Date()
        };
        realm.write(() => {
            realm.create('PracticeSession', newPracticeSession);
        });
        return newPracticeSession;
    }

    addNewPraciseCardResult(card, practiceSession, answeredCorrect, user, verifiedBy){
        let practiseCardResult = {
            id: uuid.v1(), 
            user: user.id, 
            verifiedBy: verifiedBy ? verifiedBy.id : 'guest', 
            cardId: card.id,
            answeredCorrect: answeredCorrect,
            lastModified: new Date()
        };

        realm.write(() => {
            let practiceSessionForId = realm.objectForPrimaryKey('PracticeSession', practiceSession.id);
            if(practiceSessionForId){
                practiceSessionForId.results.push(practiseCardResult);
            }
        });
    }
}

export default new PracticeDao();