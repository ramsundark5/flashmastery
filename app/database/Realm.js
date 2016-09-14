import Realm from 'realm';

class Assignment extends Realm.Object {}
Assignment.schema = {
    name: 'Assignment',
    primaryKey: 'id',
    properties: {
        id: 'int',
        word: 'string',
    },
};

class AssignmentList extends Realm.Object {}
AssignmentList.schema = {
    name: 'AssignmentList',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        assignments: {type: 'list', objectType: 'Assignment'},
    },
};

class AssignmentResult extends Realm.Object {}
AssignmentResult.schema = {
    name: 'AssignmentResult',
    primaryKey: 'id',
    properties: {
        id: 'int',
        user: 'int',
        verifiedBy: 'int',
        assignment: {type: 'Assignment'},
        correctAnswer: {type: 'bool', default: false},
    },
};

class AssignmentResultList extends Realm.Object {}
AssignmentResultList.schema = {
    name: 'AssignmentResultList',
    primaryKey: 'id',
    properties: {
        id: 'int',
        user: 'int',
        assignment: {type: 'Assignment'},
        correctAnswer: {type: 'bool', default: false},
    },
};

export default new Realm({schema: [Assignment, AssignmentList, AssignmentResult, AssignmentResultList]});