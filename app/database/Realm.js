import Realm from 'realm';

class Card extends Realm.Object {}
Card.schema = {
    name: 'Card',
    primaryKey: 'id',
    properties: {
        id: 'string',
        type: 'string',
        front: 'string',
        frontType: 'string',
        back: {type: 'string', optional: true}, 
        backType: {type: 'string', optional: true}, 
        pronounciation: {type: 'string', optional: true}, 
        sound: {type: 'string', optional: true}, 
        image: {type: 'string', optional: true}, 
        desription: {type: 'string', optional: true}, 
        url: {type: 'string', optional: true}, 
        lastModified: 'date'
    },
};

class Deck extends Realm.Object {}
Deck.schema = {
    name: 'Deck',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        custom: {type: 'bool', default: true}, 
        cards: {type: 'list', objectType: 'Card'},
        lastModified: 'date'
    },
};

class DeckSet extends Realm.Object {}
DeckSet.schema = {
    name: 'DeckSet',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        custom: {type: 'bool', default: true}, 
        decks: {type: 'list', objectType: 'Deck'},
        lastModified: 'date'
    },
};

class PracticeCardResult extends Realm.Object {}
PracticeCardResult.schema = {
    name: 'PracticeCardResult',
    primaryKey: 'id',
    properties: {
        id: 'string',
        user: 'string',
        verifiedBy: 'string',
        card: {type: 'Card'},
        answeredCorrect: {type: 'bool', default: false},
        lastModified: 'date'
    },
};

class PracticeSession extends Realm.Object {}
PracticeSession.schema = {
    name: 'PracticeSession',
    primaryKey: 'id',
    properties: {
        id: 'string',
        user: 'string',
        verifiedBy: 'string',
        deck: {type: 'Deck'},
        results: {type: 'list', objectType: 'PracticeCardResult'},
        lastModified: 'date'
    },
};

class VersionInfo extends Realm.Object {}
VersionInfo.schema = {
    name: 'VersionInfo',
    properties: {
        version: 'int',
        lastModified: 'date',
        lastUpdated: {type: 'date'}
    },
};

export default new Realm({
    schema: [Card, Deck, DeckSet, PracticeCardResult, PracticeSession, VersionInfo],
    schemaVersion: 6
});