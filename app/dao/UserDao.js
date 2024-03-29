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
        return users;
    }

    getFirstUser(){
        let firstUser = null;
        let users = this.getAllUsers();
        if(users && users.length > 0){
            firstUser = users[0];
        }
        return firstUser;
    }

    addUser(name, admin = true){
        let newUser = {
            id: uuid.v1(), 
            name: name || 'User!', 
            admin: admin,
            lastModified: new Date()
        };

        realm.write(() => {
            realm.create('User', newUser);
        });
        return newUser;
    }

    updateUser(updatedUser){
        updatedUser.lastModified = new Date();
        realm.write(() => {
            realm.create('User', updatedUser, true);
        });
    }

    deleteUser(userId){
        realm.write(() => {
            let userToBeDeleted = realm.objectForPrimaryKey('User', userId);
            if(userToBeDeleted){
                realm.delete(userToBeDeleted);
            }
        });
    }
}

export default new UserDao();