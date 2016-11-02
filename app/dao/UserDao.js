import realm from '../database/Realm';
import uuid from 'react-native-uuid';

class UserDao{

    getAllUsers(){
        let users = [];
        let realmUsers = realm.objects('User');
        realmUsers.map(function(realmUser) {
            if (typeof realmUser.snapshot == 'function') {
                realmUser = realmUser.snapshot();
            } 
            let user = Object.assign({}, realmUser);
            users.push(user);
        });
        return user;
    }

    addUser(name, admin = true){
        let newUser = {
            id: uuid.v1(), 
            name: name || 'Default', 
            admin: admin,
            lastModified: new Date()
        };

        realm.write(() => {
            realm.create('User', newUser);
        });
    }

    updateUser(updatedUser){
        updatedUser.lastModified = new Date();
        realm.write(() => {
            realm.create('User', updatedUser, true);
        });
    }
}

export default new UserDao();