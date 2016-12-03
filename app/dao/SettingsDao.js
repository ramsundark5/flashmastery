import realm from '../database/Realm';

class SettingsDao{

    getSettings(){
       let realmSettings = realm.objectForPrimaryKey('Settings', 1);
       if (!realmSettings){
            let newSettings = {id: 1, minimumAccuracy: 80, minimumAttempts: 2, lastModified: new Date()};
            realm.write(() => {
                realm.create('Settings', newSettings);
            });
            realmSettings = realm.objectForPrimaryKey('Settings', 1);
        } 
        if (realmSettings && typeof realmSettings.snapshot == 'function') {
            realmSettings = realmSettings.snapshot();
        }
        let settings = Object.assign({}, realmSettings);
        return settings;
    }

    updateSettings(updatedSettings){
       realm.write(() => {
            realm.create('Settings', updatedSettings, true);
        });
    }
}

export default new SettingsDao();