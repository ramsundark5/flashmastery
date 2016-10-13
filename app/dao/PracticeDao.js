import realm from '../database/Realm';
import uuid from 'react-native-uuid';

class PracticeDao{

    getAllPracticeSession(){
        let practiceSessions = [];
        let realmPracticeSessions = realm.objects('PracticeSession');
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
            user: user || 'default', 
            verifiedBy: verifiedBy || 'default', 
            deck: deck,
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
            user: user || 'default', 
            verifiedBy: verifiedBy || 'default', 
            card: card,
            answeredCorrect: answeredCorrect,
            lastModified: new Date()
        };

        realm.write(() => {
            let practiceSessionForId = realm.objectForPrimaryKey('PracticeSession', practiceSession.id);
            if(practiceSessionForId){
                PracticeSessionForId.results.push(practiseCardResult);
            }
        });
    }
}

export default new PracticeDao();