import realm from '../database/Realm';
import SettingsDao from './SettingsDao';
import UtilityService from '../utils/UtilityService';

class ReportDao{

    getPracticeCardAccuracy(cardId, userId){
       let settings = SettingsDao.getSettings();
       let minimumAccuracy = settings.minimumAccuracy;

       let realmPracticeCardResults = realm.objects('PracticeCardResult').filtered('cardId = $0 AND user = $1', cardId, userId);
       let totalAttempts = realmPracticeCardResults.length;

       let totalCorrect = realmPracticeCardResults.filtered('answeredCorrect = true').length;
       let accuracy = totalCorrect/totalAttempts * 100;
       let roundedAccuracy = UtilityService.roundToPlaces(accuracy, 0); 
       return roundedAccuracy;
    }

    isCardMastered(cardId, userId){
       let settings = SettingsDao.getSettings();
       let minimumAccuracy = settings.minimumAccuracy;

       let roundedAccuracy = this.getPracticeCardAccuracy(cardId, userId); 
       if(isNaN(roundedAccuracy) || roundedAccuracy < minimumAccuracy){
           return false;
       }
       return true;
    }
}

export default new ReportDao();