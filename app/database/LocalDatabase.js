import {Kindergarten} from './kindergarten/Kindergarten';
import {Grade1} from './grade1/Grade1';
const SightWords = require('./SightWords.json');

export const LocalDatabase = [ 
    {id: "5023c338-7b87-11e6-8b77-86f30ca893d3",  name: "Kindergarten", decks: Kindergarten, custom: false}, 
    {id: "6bea4938-7b88-11e6-8b77-86f30ca893d3", name: "Sight Words", decks: SightWords, custom: false}, 
    {id: "73be0b36-7b88-11e6-8b77-86f30ca893d3", name: "2nd Grade", decks: Grade1, custom: false}, 
    {id: "7abccf62-7b88-11e6-8b77-86f30ca893d3", name: "3rd Grade", decks: Grade1, custom: false}
];