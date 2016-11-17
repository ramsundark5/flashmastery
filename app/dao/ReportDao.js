import realm from '../database/Realm';

class ReportDao{

    getPracticeCardAccuracy(cardId, userId){
       let realmPracticeCardResults = realm.objects('PracticeCardResult').filtered('cardId = $0 AND user = $1', cardId, userId);
       let totalQuestions = realmPracticeCardResults.length;
       let totalAnswered = realmPracticeCardResults.filtered('answeredCorrect = true').length;
       let roundedAccuracy = Math.round ((totalAnswered/totalQuestions) * 10) / 10;
       let accuracy = roundedAccuracy * 100; 
       return accuracy;
    }
}

export default new ReportDao();