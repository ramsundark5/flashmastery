import realm from '../database/Realm';
import SettingsDao from './SettingsDao';

class ReportDao{

    getPracticeCardAccuracy(cardId, userId){
       let settings = SettingsDao.getSettings();
       let recentAttemptsToBeConsidered = settings.minimumAttempts;
       let minimumAccuracy = settings.minimumAccuracy;

       let realmPracticeCardResults = realm.objects('PracticeCardResult').filtered('cardId = $0 AND user = $1', cardId, userId);
       let totalAttempts = realmPracticeCardResults.length;
       if(totalAttempts < recentAttemptsToBeConsidered){
           return -1;
       }
       let latestRealmPracticeCardResults = realmPracticeCardResults.slice(recentAttemptsToBeConsidered * -1);

       let totalCorrect = latestRealmPracticeCardResults.filter(function(latestRealmPracticeCardResult){
                return latestRealmPracticeCardResult.answeredCorrect == true;
       }).length;
       
       let accuracy = totalCorrect/recentAttemptsToBeConsidered * 100;
       let roundedAccuracy = this.roundToPlaces(accuracy, 2); 
       return roundedAccuracy;
    }

    isCardMastered(cardId, userId){
       let settings = SettingsDao.getSettings();
       let minimumAccuracy = settings.minimumAccuracy;

       let roundedAccuracy = this.getPracticeCardAccuracy(cardId, userId); 
       if(roundedAccuracy < minimumAccuracy){
           return false;
       }
       return true;
    }

    roundToPlaces(num, places) { 
        let multiplier = Math.pow(10, places); 
        return (Math.round(num * multiplier) / multiplier);
    }
}

export default new ReportDao();