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
        back: 'string',
        backType: 'string',
        pronounciation: 'string',
        sound: 'string',
        image: 'string',
        desription: 'string',
        url: 'string',
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

class DeckPractiseResult extends Realm.Object {}
DeckPractiseResult.schema = {
    name: 'DeckPractiseResult',
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
    schema: [Card, Deck, DeckSet, DeckPractiseResult, VersionInfo],
    schemaVersion: 2
});