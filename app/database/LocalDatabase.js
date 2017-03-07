import {Kindergarten} from './kindergarten/Kindergarten';
import {Grade1} from './grade1/Grade1';
const AdditionFacts = require('./AdditionFacts.json');
const DivisionFacts = require('./DivisionFacts.json');
const MultiplicationFacts = require('./MultiplicationFacts.json');
const PhonicsSounds = require('./PhonicsSounds.json');
const SightWords = require('./SightWords.json');
const SubtractionFacts = require('./SubtractionFacts.json');

export const LocalDatabase = [ 
    {id: "2329cfae-f5f3-41de-abb3-ab6224d62024",  name: "Addition Facts", decks: AdditionFacts, custom: false}, 
    {id: "10ef1626-1366-4a9c-b4ad-dfb2a247788d",  name: "Subtraction Facts", decks: SubtractionFacts, custom: false}, 
    {id: "140736dc-5dc9-453a-ac75-5f0731d7eeb0", name: "Division Facts", decks: DivisionFacts, custom: false}, 
    {id: "d82dd36d-203f-4cc2-b7c2-3ea722445f79", name: "Multiplication Facts", decks: MultiplicationFacts, custom: false}, 
    {id: "ddd81a15-a1f0-447a-bd0b-ea9f8526eec1", name: "Phonics Sounds", decks: PhonicsSounds, custom: false},
    {id: "edb14376-4207-48a9-bbca-dfab9b5a426b", name: "Sight Words", decks: SightWords, custom: false}
];