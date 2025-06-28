"use client"
import { ICategory } from '@/models/category';
import { IQuiz } from '@/models/quiz';
import React, { ReactNode, createContext, useContext, useState} from 'react';

export interface QuizContextType {
    quizzes: IQuiz[];
    categories: ICategory[];
    addQuizze: (quiz: IQuiz) => void;
}

const sampleQuizzes: IQuiz[] = [
    {
        id: "QUIZ001",
        title: 'Quiz de Connaissances Générales',
        description: 'Testez vos connaissances générales sur divers sujets.',
        categoryId: 1,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Quelle est la capitale de la France ?',
                image: null,
                answers: [
                    { value: 'Paris', isCorrect: true },
                    { value: 'Madrid', isCorrect: false },
                    { value: 'Londres', isCorrect: false },
                    { value: 'Berlin', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Paris est la capitale et la ville la plus peuplée de France.',
                points: 1
            },
            {
                id: 2,
                question: 'Quel élément a le symbole chimique O ?',
                image: null,
                answers: [
                    { value: 'Or', isCorrect: false },
                    { value: 'Oxygène', isCorrect: true },
                    { value: 'Argent', isCorrect: false },
                    { value: 'Hélium', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'oxygène est représenté par le symbole O.',
                points: 1
            },
            {
                id: 3,
                question: 'Qui a écrit "Hamlet" ?',
                image: null,
                answers: [
                    { value: 'William Shakespeare', isCorrect: true },
                    { value: 'Charles Dickens', isCorrect: false },
                    { value: 'Jane Austen', isCorrect: false },
                    { value: 'Léon Tolstoï', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'William Shakespeare est l\'auteur de "Hamlet".',
                points: 1
            },
            {
                id: 4,
                question: 'Quelle est la plus grande planète de notre système solaire ?',
                image: null,
                answers: [
                    { value: 'Terre', isCorrect: false },
                    { value: 'Saturne', isCorrect: false },
                    { value: 'Jupiter', isCorrect: true },
                    { value: 'Mars', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Jupiter est la plus grande planète de notre système solaire.',
                points: 1
            },
            {
                id: 5,
                question: 'En quelle année le Titanic a-t-il coulé ?',
                image: null,
                answers: [
                    { value: '1912', isCorrect: true },
                    { value: '1905', isCorrect: false },
                    { value: '1898', isCorrect: false },
                    { value: '1923', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le Titanic a coulé en 1912.',
                points: 1
            },
            {
                id: 6,
                question: 'Quelle est la substance naturelle la plus dure sur Terre ?',
                image: null,
                answers: [
                    { value: 'Or', isCorrect: false },
                    { value: 'Fer', isCorrect: false },
                    { value: 'Diamant', isCorrect: true },
                    { value: 'Quartz', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le diamant est la substance naturelle la plus dure sur Terre.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel pays est connu comme le pays du soleil levant ?',
                image: null,
                answers: [
                    { value: 'Chine', isCorrect: false },
                    { value: 'Japon', isCorrect: true },
                    { value: 'Corée du Sud', isCorrect: false },
                    { value: 'Thaïlande', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le Japon est connu comme le pays du soleil levant.',
                points: 1
            },
            {
                id: 8,
                question: 'Quel est l\'ingrédient principal du guacamole ?',
                image: null,
                answers: [
                    { value: 'Tomate', isCorrect: false },
                    { value: 'Avocat', isCorrect: true },
                    { value: 'Oignon', isCorrect: false },
                    { value: 'Poivron', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'avocat est l\'ingrédient principal du guacamole.',
                points: 1
            },
            {
                id: 9,
                question: 'Que signifie CPU en termes d\'informatique ?',
                image: null,
                answers: [
                    { value: 'Unité de Processus Central', isCorrect: false },
                    { value: 'Unité Centrale de Traitement', isCorrect: true },
                    { value: 'Unité Personnelle d\'Ordinateur', isCorrect: false },
                    { value: 'Unité de Processeur Central', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'CPU signifie Unité Centrale de Traitement.',
                points: 1
            },
            {
                id: 10,
                question: 'Quelle vitamine est principalement obtenue à partir de la lumière du soleil ?',
                image: null,
                answers: [
                    { value: 'Vitamine A', isCorrect: false },
                    { value: 'Vitamine D', isCorrect: true },
                    { value: 'Vitamine C', isCorrect: false },
                    { value: 'Vitamine E', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La vitamine D est principalement obtenue à partir de la lumière du soleil.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ002",
        title: 'Quiz sur la Culture Pop et les Faits Scientifiques',
        description: 'Explorez vos connaissances en culture populaire et en faits scientifiques.',
        categoryId: 4,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Qui est le réalisateur de la trilogie "Le Seigneur des Anneaux" ?',
                image: null,
                answers: [
                    { value: 'Steven Spielberg', isCorrect: false },
                    { value: 'Peter Jackson', isCorrect: true },
                    { value: 'James Cameron', isCorrect: false },
                    { value: 'Christopher Nolan', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Peter Jackson est le réalisateur de la trilogie "Le Seigneur des Anneaux".',
                points: 1
            },
            {
                id: 2,
                question: 'Quel gaz les plantes absorbent-elles de l\'atmosphère pour la photosynthèse ?',
                image: null,
                answers: [
                    { value: 'Oxygène', isCorrect: false },
                    { value: 'Dioxyde de carbone', isCorrect: true },
                    { value: 'Azote', isCorrect: false },
                    { value: 'Hydrogène', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Les plantes absorbent le dioxyde de carbone pour la photosynthèse.',
                points: 1
            },
            {
                id: 3,
                question: 'Quel artiste est connu pour le tube pop "Thriller" ?',
                image: null,
                answers: [
                    { value: 'Prince', isCorrect: false },
                    { value: 'Michael Jackson', isCorrect: true },
                    { value: 'Madonna', isCorrect: false },
                    { value: 'David Bowie', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Michael Jackson est connu pour la chanson "Thriller".',
                points: 1
            },
            {
                id: 4,
                question: 'Quelle planète est la plus proche du Soleil ?',
                image: null,
                answers: [
                    { value: 'Vénus', isCorrect: false },
                    { value: 'Mercure', isCorrect: true },
                    { value: 'Terre', isCorrect: false },
                    { value: 'Mars', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Mercure est la planète la plus proche du Soleil.',
                points: 1
            },
            {
                id: 5,
                question: 'En quelle année le premier film "Star Wars" a-t-il été lancé ?',
                image: null,
                answers: [
                    { value: '1977', isCorrect: true },
                    { value: '1980', isCorrect: false },
                    { value: '1973', isCorrect: false },
                    { value: '1983', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le premier film "Star Wars" a été lancé en 1977.',
                points: 1
            },
            {
                id: 6,
                question: 'Quel est le plus grand mammifère du monde ?',
                image: null,
                answers: [
                    { value: 'Éléphant', isCorrect: false },
                    { value: 'Baleine bleue', isCorrect: true },
                    { value: 'Girafe', isCorrect: false },
                    { value: 'Rhinocéros', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La baleine bleue est le plus grand mammifère du monde.',
                points: 1
            },
            {
                id: 7,
                question: 'Quelle est la formule chimique de l\'eau ?',
                image: null,
                answers: [
                    { value: 'H2O', isCorrect: true },
                    { value: 'CO2', isCorrect: false },
                    { value: 'NaCl', isCorrect: false },
                    { value: 'O2', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La formule chimique de l\'eau est H2O.',
                points: 1
            },
            {
                id: 8,
                question: 'Dans quel pays la société Nintendo a-t-elle été fondée à l\'origine ?',
                image: null,
                answers: [
                    { value: 'États-Unis', isCorrect: false },
                    { value: 'Japon', isCorrect: true },
                    { value: 'Corée du Sud', isCorrect: false },
                    { value: 'Allemagne', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Nintendo a été fondée à l\'origine au Japon.',
                points: 1
            },
            {
                id: 9,
                question: 'Qui a peint la "Joconde" ?',
                image: null,
                answers: [
                    { value: 'Vincent van Gogh', isCorrect: false },
                    { value: 'Léonard de Vinci', isCorrect: true },
                    { value: 'Pablo Picasso', isCorrect: false },
                    { value: 'Claude Monet', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Léonard de Vinci a peint la "Joconde".',
                points: 1
            },
            {
                id: 10,
                question: 'Quel est l\'ingrédient principal de la soupe miso traditionnelle japonaise ?',
                image: null,
                answers: [
                    { value: 'Riz', isCorrect: false },
                    { value: 'Pâte de miso', isCorrect: true },
                    { value: 'Algues', isCorrect: false },
                    { value: 'Tofu', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La pâte de miso est l\'ingrédient principal de la soupe miso traditionnelle japonaise.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ003",
        title: 'Défi Histoire et Géographie',
        description: 'Testez vos connaissances sur les événements historiques et la géographie mondiale.',
        categoryId: 2,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Quelle civilisation ancienne a construit le complexe de Machu Picchu ?',
                image: null,
                answers: [
                    { value: 'Les Aztèques', isCorrect: false },
                    { value: 'Les Incas', isCorrect: true },
                    { value: 'Les Mayas', isCorrect: false },
                    { value: 'Les Olmèques', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Les Incas ont construit le complexe de Machu Picchu au 15e siècle.',
                points: 1
            },
            {
                id: 2,
                question: 'Quel pays est le plus grand en superficie ?',
                image: null,
                answers: [
                    { value: 'États-Unis', isCorrect: false },
                    { value: 'Chine', isCorrect: false },
                    { value: 'Russie', isCorrect: true },
                    { value: 'Canada', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La Russie est le pays le plus grand en superficie.',
                points: 1
            },
            {
                id: 3,
                question: 'Pendant quelle guerre la bataille de Gettysburg a-t-elle eu lieu ?',
                image: null,
                answers: [
                    { value: 'Première Guerre mondiale', isCorrect: false },
                    { value: 'Guerre de Sécession', isCorrect: true },
                    { value: 'Guerre d\'Indépendance', isCorrect: false },
                    { value: 'Seconde Guerre mondiale', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La bataille de Gettysburg a eu lieu pendant la Guerre de Sécession.',
                points: 1
            },
            {
                id: 4,
                question: 'Quel fleuve est le plus long du monde ?',
                image: null,
                answers: [
                    { value: 'Fleuve Amazone', isCorrect: false },
                    { value: 'Fleuve Nil', isCorrect: true },
                    { value: 'Fleuve Yangtsé', isCorrect: false },
                    { value: 'Fleuve Mississippi', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le fleuve Nil est généralement considéré comme le plus long fleuve du monde.',
                points: 1
            },
            {
                id: 5,
                question: 'Qui a été le premier président des États-Unis ?',
                image: null,
                answers: [
                    { value: 'Thomas Jefferson', isCorrect: false },
                    { value: 'Abraham Lincoln', isCorrect: false },
                    { value: 'George Washington', isCorrect: true },
                    { value: 'John Adams', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'George Washington a été le premier président des États-Unis.',
                points: 1
            },
            {
                id: 6,
                question: 'Quelle ville est connue comme la "Ville de l\'Amour" ?',
                image: null,
                answers: [
                    { value: 'Rome', isCorrect: false },
                    { value: 'Paris', isCorrect: true },
                    { value: 'Venise', isCorrect: false },
                    { value: 'Vienne', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Paris est souvent surnommée la "Ville de l\'Amour".',
                points: 1
            },
            {
                id: 7,
                question: 'En quelle année le mur de Berlin est-il tombé ?',
                image: null,
                answers: [
                    { value: '1989', isCorrect: true },
                    { value: '1991', isCorrect: false },
                    { value: '1987', isCorrect: false },
                    { value: '1990', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le mur de Berlin est tombé en 1989.',
                points: 1
            },
            {
                id: 8,
                question: 'Quelle est la capitale de l\'Australie ?',
                image: null,
                answers: [
                    { value: 'Sydney', isCorrect: false },
                    { value: 'Melbourne', isCorrect: false },
                    { value: 'Canberra', isCorrect: true },
                    { value: 'Perth', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Canberra est la capitale de l\'Australie.',
                points: 1
            },
            {
                id: 9,
                question: 'Qui a découvert la pénicilline ?',
                image: null,
                answers: [
                    { value: 'Marie Curie', isCorrect: false },
                    { value: 'Alexander Fleming', isCorrect: true },
                    { value: 'Louis Pasteur', isCorrect: false },
                    { value: 'Gregor Mendel', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Alexander Fleming a découvert la pénicilline en 1928.',
                points: 1
            },
            {
                id: 10,
                question: 'Quel empire était connu comme le "Pays du Soleil Levant" ?',
                image: null,
                answers: [
                    { value: 'L\'Empire ottoman', isCorrect: false },
                    { value: 'L\'Empire britannique', isCorrect: false },
                    { value: 'L\'Empire romain', isCorrect: false },
                    { value: 'L\'Empire japonais', isCorrect: true }
                ],
                allowMultipleChoice: false,
                explanation: 'Le terme "Pays du Soleil Levant" fait référence au Japon.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ004",
        title: 'Quiz sur les Arts et la Littérature',
        description: 'Plongez dans l\'univers des arts classiques et modernes ainsi que de la littérature.',
        categoryId: 3,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Qui a écrit "Orgueil et Préjugés" ?',
                image: null,
                answers: [
                    { value: 'Charlotte Brontë', isCorrect: false },
                    { value: 'Jane Austen', isCorrect: true },
                    { value: 'Emily Dickinson', isCorrect: false },
                    { value: 'Virginia Woolf', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Jane Austen est l\'auteure de "Orgueil et Préjugés".',
                points: 1
            },
            {
                id: 2,
                question: 'Quel peintre est célèbre pour l\'œuvre "La Nuit étoilée" ?',
                image: null,
                answers: [
                    { value: 'Pablo Picasso', isCorrect: false },
                    { value: 'Vincent van Gogh', isCorrect: true },
                    { value: 'Claude Monet', isCorrect: false },
                    { value: 'Salvador Dalí', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Vincent van Gogh est célèbre pour avoir peint "La Nuit étoilée".',
                points: 1
            },
            {
                id: 3,
                question: 'Quel est le thème principal de "Hamlet" de Shakespeare ?',
                image: null,
                answers: [
                    { value: 'L\'amour', isCorrect: false },
                    { value: 'La trahison', isCorrect: true },
                    { value: 'L\'amitié', isCorrect: false },
                    { value: 'La joie', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le thème principal de "Hamlet" est la trahison.',
                points: 1
            },
            {
                id: 4,
                question: 'Quel livre commence par la phrase "Appelez-moi Ishmaël" ?',
                image: null,
                answers: [
                    { value: 'Gatsby le Magnifique', isCorrect: false },
                    { value: 'Moby Dick', isCorrect: true },
                    { value: '1984', isCorrect: false },
                    { value: 'Catch-22', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Moby Dick commence par la phrase "Appelez-moi Ishmaël".',
                points: 1
            },
            {
                id: 5,
                question: 'Qui a peint "La Joconde" ?',
                image: null,
                answers: [
                    { value: 'Michel-Ange', isCorrect: false },
                    { value: 'Léonard de Vinci', isCorrect: true },
                    { value: 'Raphaël', isCorrect: false },
                    { value: 'Donatello', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Léonard de Vinci a peint "La Joconde".',
                points: 1
            },
            {
                id: 6,
                question: 'Quel genre littéraire est caractérisé par la réimagination d\'événements historiques ?',
                image: null,
                answers: [
                    { value: 'Science-fiction', isCorrect: false },
                    { value: 'Histoire alternative', isCorrect: true },
                    { value: 'Fantaisie', isCorrect: false },
                    { value: 'Mystère', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'Histoire alternative est un genre caractérisé par la réimagination d\'événements historiques.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel poète a écrit "La Route non prise" ?',
                image: null,
                answers: [
                    { value: 'Robert Frost', isCorrect: true },
                    { value: 'Walt Whitman', isCorrect: false },
                    { value: 'Emily Dickinson', isCorrect: false },
                    { value: 'T.S. Eliot', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Robert Frost a écrit "La Route non prise".',
                points: 1
            },
            {
                id: 8,
                question: 'Dans quel pays le mouvement artistique baroque a-t-il pris naissance ?',
                image: null,
                answers: [
                    { value: 'France', isCorrect: false },
                    { value: 'Italie', isCorrect: true },
                    { value: 'Espagne', isCorrect: false },
                    { value: 'Allemagne', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le mouvement artistique baroque a pris naissance en Italie.',
                points: 1
            },
            {
                id: 9,
                question: 'Quel auteur a écrit le roman dystopique "Le Meilleur des mondes" ?',
                image: null,
                answers: [
                    { value: 'George Orwell', isCorrect: false },
                    { value: 'Aldous Huxley', isCorrect: true },
                    { value: 'Ray Bradbury', isCorrect: false },
                    { value: 'Philip K. Dick', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Aldous Huxley a écrit le roman dystopique "Le Meilleur des mondes".',
                points: 1
            },
            {
                id: 10,
                question: 'Quelle technique artistique utilisée par les peintres représente la lumière et l\'ombre telles qu\'elles définissent les objets tridimensionnels ?',
                image: null,
                answers: [
                    { value: 'Le pointillisme', isCorrect: false },
                    { value: 'Le clair-obscur', isCorrect: true },
                    { value: 'L\'impressionnisme', isCorrect: false },
                    { value: 'Le cubisme', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le clair-obscur est la technique utilisée pour représenter la lumière et l\'ombre.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ005",
        title: 'Quiz sur la Science et la Technologie',
        description: 'Mettez à l\'épreuve vos connaissances dans les domaines de la science et de la technologie.',
        categoryId: 1,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Quelle est la fonction principale des neurones dans le corps humain ?',
                image: null,
                answers: [
                    { value: 'Fournir un soutien structurel', isCorrect: false },
                    { value: 'Transporter des nutriments', isCorrect: false },
                    { value: 'Transmettre des informations', isCorrect: true },
                    { value: 'Combattre les infections', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Les neurones transmettent des informations dans tout le corps.',
                points: 1
            },
            {
                id: 2,
                question: 'Qui est considéré comme le père de l\'informatique moderne ?',
                image: null,
                answers: [
                    { value: 'Charles Babbage', isCorrect: true },
                    { value: 'Alan Turing', isCorrect: false },
                    { value: 'John von Neumann', isCorrect: false },
                    { value: 'Steve Jobs', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Charles Babbage est souvent considéré comme le père de l\'informatique moderne.',
                points: 1
            },
            {
                id: 3,
                question: 'Quel est le gaz le plus abondant dans l\'atmosphère terrestre ?',
                image: null,
                answers: [
                    { value: 'Oxygène', isCorrect: false },
                    { value: 'Hydrogène', isCorrect: false },
                    { value: 'Dioxyde de carbone', isCorrect: false },
                    { value: 'Azote', isCorrect: true }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'azote est le gaz le plus abondant dans l\'atmosphère terrestre.',
                points: 1
            },
            {
                id: 4,
                question: 'Quelle technologie est utilisée pour enregistrer l\'activité électrique du cerveau ?',
                image: null,
                answers: [
                    { value: 'Électrocardiogramme (ECG)', isCorrect: false },
                    { value: 'Électroencéphalogramme (EEG)', isCorrect: true },
                    { value: 'Imagerie par résonance magnétique (IRM)', isCorrect: false },
                    { value: 'Échographie', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Un Électroencéphalogramme (EEG) est utilisé pour enregistrer l\'activité électrique du cerveau.',
                points: 1
            },
            {
                id: 5,
                question: 'Quel élément a la plus haute conductivité électrique ?',
                image: null,
                answers: [
                    { value: 'Or', isCorrect: false },
                    { value: 'Cuivre', isCorrect: false },
                    { value: 'Argent', isCorrect: true },
                    { value: 'Aluminium', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'argent a la plus haute conductivité électrique de tous les éléments.',
                points: 1
            },
            {
                id: 6,
                question: 'À quelle invention Alexander Graham Bell est-il associé ?',
                image: null,
                answers: [
                    { value: 'Ampoule électrique', isCorrect: false },
                    { value: 'Téléphone', isCorrect: true },
                    { value: 'Radio', isCorrect: false },
                    { value: 'Télévision', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Alexander Graham Bell est mieux connu pour son invention du téléphone.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel est le processus par lequel les plantes fabriquent leur nourriture en utilisant la lumière du soleil ?',
                image: null,
                answers: [
                    { value: 'Respiration', isCorrect: false },
                    { value: 'Photosynthèse', isCorrect: true },
                    { value: 'Fermentation', isCorrect: false },
                    { value: 'Digestion', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La photosynthèse est le processus par lequel les plantes fabriquent leur nourriture en utilisant la lumière du soleil.',
                points: 1
            },
            {
                id: 8,
                question: 'Quelle était la première planète découverte à l\'aide d\'un télescope ?',
                image: null,
                answers: [
                    { value: 'Mars', isCorrect: false },
                    { value: 'Jupiter', isCorrect: false },
                    { value: 'Uranus', isCorrect: true },
                    { value: 'Neptune', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Uranus a été la première planète découverte avec l\'aide d\'un télescope.',
                points: 1
            },
            {
                id: 9,
                question: 'Quel langage de programmation est réputé pour son utilisation dans le développement web ?',
                image: null,
                answers: [
                    { value: 'Python', isCorrect: false },
                    { value: 'Java', isCorrect: false },
                    { value: 'JavaScript', isCorrect: true },
                    { value: 'C++', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'JavaScript est largement reconnu pour son utilisation dans le développement web.',
                points: 1
            },
            {
                id: 10,
                question: 'Qui a développé la théorie de la relativité ?',
                image: null,
                answers: [
                    { value: 'Isaac Newton', isCorrect: false },
                    { value: 'Albert Einstein', isCorrect: true },
                    { value: 'Niels Bohr', isCorrect: false },
                    { value: 'Galilée', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Albert Einstein a développé la théorie de la relativité.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ006",
        title: 'Quiz sur le Sport et les Loisirs',
        description: 'Un quiz pour tester vos connaissances sur divers sports et activités de loisirs.',
        categoryId: 6,
        shuffleQuestion: true,
        shuffleAnswer:true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Quel pays a accueilli les Jeux Olympiques d\'été de 2016 ?',
                image: null,
                answers: [
                    { value: 'Chine', isCorrect: false },
                    { value: 'Brésil', isCorrect: true },
                    { value: 'Russie', isCorrect: false },
                    { value: 'Royaume-Uni', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le Brésil a accueilli les Jeux Olympiques d\'été de 2016 à Rio de Janeiro.',
                points: 1
            },
            {
                id: 2,
                question: 'Quel est le score maximal possible dans une seule manche de bowling ?',
                image: null,
                answers: [
                    { value: '30', isCorrect: true },
                    { value: '15', isCorrect: false },
                    { value: '25', isCorrect: false },
                    { value: '20', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le score maximal possible dans une seule manche de bowling est 30, réalisable en réalisant trois strikes consécutifs.',
                points: 1
            },
            {
                id: 3,
                question: 'Quel sport est connu comme le "roi des sports" ?',
                image: null,
                answers: [
                    { value: 'Basketball', isCorrect: false },
                    { value: 'Football (Soccer)', isCorrect: true },
                    { value: 'Baseball', isCorrect: false },
                    { value: 'Cricket', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le football, ou soccer comme on l\'appelle dans certains pays, est souvent appelé le "roi des sports".',
                points: 1
            },
            {
                id: 4,
                question: 'Dans quel pays l\'art martial du Taekwondo a-t-il pris naissance ?',
                image: null,
                answers: [
                    { value: 'Japon', isCorrect: false },
                    { value: 'Corée du Sud', isCorrect: true },
                    { value: 'Chine', isCorrect: false },
                    { value: 'Thaïlande', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le Taekwondo est originaire de Corée du Sud.',
                points: 1
            },
            {
                id: 5,
                question: 'Quelle pièce sur un échiquier se déplace en forme de "L" ?',
                image: null,
                answers: [
                    { value: 'Fou', isCorrect: false },
                    { value: 'Reine', isCorrect: false },
                    { value: 'Cavalier', isCorrect: true },
                    { value: 'Tour', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le cavalier se déplace en forme de "L" sur un échiquier.',
                points: 1
            },
            {
                id: 6,
                question: 'Quel terme est utilisé lorsqu\'un golfeur marque trois coups sous le par sur un trou ?',
                image: null,
                answers: [
                    { value: 'Aigle', isCorrect: false },
                    { value: 'Birdie', isCorrect: false },
                    { value: 'Albatros', isCorrect: true },
                    { value: 'Bogey', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Un albatros est le terme utilisé lorsqu\'un golfeur marque trois coups sous le par sur un trou.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel est le seul pays à avoir participé à chaque Coupe du Monde ?',
                image: null,
                answers: [
                    { value: 'Brésil', isCorrect: true },
                    { value: 'Allemagne', isCorrect: false },
                    { value: 'Italie', isCorrect: false },
                    { value: 'Argentine', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le Brésil est le seul pays à avoir participé à chaque Coupe du Monde.',
                points: 1
            },
            {
                id: 8,
                question: 'Combien de joueurs y a-t-il dans une équipe de baseball ?',
                image: null,
                answers: [
                    { value: '9', isCorrect: true },
                    { value: '11', isCorrect: false },
                    { value: '7', isCorrect: false },
                    { value: '5', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Il y a 9 joueurs dans une équipe de baseball.',
                points: 1
            },
            {
                id: 9,
                question: 'Quel jeu se joue sur un terrain avec un volant ?',
                image: null,
                answers: [
                    { value: 'Tennis', isCorrect: false },
                    { value: 'Badminton', isCorrect: true },
                    { value: 'Squash', isCorrect: false },
                    { value: 'Ping-pong', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le badminton se joue avec un volant.',
                points: 1
            },
            {
                id: 10,
                question: 'Quelle épreuve combine le ski de fond et le tir à la carabine ?',
                image: null,
                answers: [
                    { value: 'Biathlon', isCorrect: true },
                    { value: 'Triathlon', isCorrect: false },
                    { value: 'Décathlon', isCorrect: false },
                    { value: 'Heptathlon', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le biathlon combine le ski de fond et le tir à la carabine.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ007",
        title: 'Quiz sur les Découvertes Scientifiques et les Innovations',
        description: 'Explorez les principales percées scientifiques et les innovations technologiques.',
        categoryId: 7,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Qui a inventé le premier téléphone pratique ?',
                image: null,
                answers: [
                    { value: 'Thomas Edison', isCorrect: false },
                    { value: 'Alexander Graham Bell', isCorrect: true },
                    { value: 'Nikola Tesla', isCorrect: false },
                    { value: 'Guglielmo Marconi', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Alexander Graham Bell est crédité de l\'invention du premier téléphone pratique.',
                points: 1
            },
            {
                id: 2,
                question: 'À quoi sert la pénicilline ?',
                image: null,
                answers: [
                    { value: 'Infections virales', isCorrect: false },
                    { value: 'Infections bactériennes', isCorrect: true },
                    { value: 'Infections fongiques', isCorrect: false },
                    { value: 'Maladies non infectieuses', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La pénicilline est utilisée pour traiter les infections bactériennes.',
                points: 1
            },
            {
                id: 3,
                question: 'Quel physicien a développé la théorie de la relativité générale ?',
                image: null,
                answers: [
                    { value: 'Isaac Newton', isCorrect: false },
                    { value: 'Albert Einstein', isCorrect: true },
                    { value: 'Marie Curie', isCorrect: false },
                    { value: 'Richard Feynman', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Albert Einstein a développé la théorie de la relativité générale.',
                points: 1
            },
            {
                id: 4,
                question: 'Que signifie l\'ADN ?',
                image: null,
                answers: [
                    { value: 'Acide désoxyribonucléique', isCorrect: true },
                    { value: 'Acide dinucléotidique', isCorrect: false },
                    { value: 'Acide dioxyribonucléaire', isCorrect: false },
                    { value: 'Acide dinucléaire', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'ADN signifie Acide désoxyribonucléique.',
                points: 1
            },
            {
                id: 5,
                question: 'En quelle année le World Wide Web a-t-il été inventé ?',
                image: null,
                answers: [
                    { value: '1989', isCorrect: true },
                    { value: '1975', isCorrect: false },
                    { value: '1995', isCorrect: false },
                    { value: '1980', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le World Wide Web a été inventé en 1989 par Tim Berners-Lee.',
                points: 1
            },
            {
                id: 6,
                question: 'Qui est connu pour avoir découvert la loi de la gravité ?',
                image: null,
                answers: [
                    { value: 'Galilée', isCorrect: false },
                    { value: 'Johannes Kepler', isCorrect: false },
                    { value: 'Isaac Newton', isCorrect: true },
                    { value: 'Albert Einstein', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Isaac Newton est connu pour avoir découvert la loi de la gravité.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel scientifique a découvert la radioactivité ?',
                image: null,
                answers: [
                    { value: 'Marie Curie', isCorrect: true },
                    { value: 'Enrico Fermi', isCorrect: false },
                    { value: 'Niels Bohr', isCorrect: false },
                    { value: 'Antoine Henri Becquerel', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Marie Curie est connue pour ses découvertes sur la radioactivité.',
                points: 1
            },
            {
                id: 8,
                question: 'Quel est l\'usage principal du silicium en technologie ?',
                image: null,
                answers: [
                    { value: 'Technologie des batteries', isCorrect: false },
                    { value: 'Semi-conducteurs', isCorrect: true },
                    { value: 'Écrans d\'affichage', isCorrect: false },
                    { value: 'Lentilles de caméra', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le silicium est principalement utilisé dans les semi-conducteurs.',
                points: 1
            },
            {
                id: 9,
                question: 'Quel a été le premier vaccin réussi développé dans l\'histoire ?',
                image: null,
                answers: [
                    { value: 'Vaccin contre la rougeole', isCorrect: false },
                    { value: 'Vaccin contre la variole', isCorrect: true },
                    { value: 'Vaccin contre la polio', isCorrect: false },
                    { value: 'Vaccin contre la rage', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le premier vaccin réussi développé était contre la variole par Edward Jenner.',
                points: 1
            },
            {
                id: 10,
                question: 'Quelle machine est considérée comme le premier ordinateur ?',
                image: null,
                answers: [
                    { value: 'ENIAC', isCorrect: true },
                    { value: 'UNIVAC', isCorrect: false },
                    { value: 'IBM PC', isCorrect: false },
                    { value: 'Apple I', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'ENIAC est considéré comme l\'un des premiers ordinateurs électroniques à usage général.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ008",
        title: 'Quiz sur la Musique et le Cinéma',
        description: 'Testez vos connaissances sur les grands succès musicaux et les films classiques.',
        categoryId: 4,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Quel film contient la réplique : "Je suis le roi du monde !" ?',
                image: null,
                answers: [
                    { value: 'Le Roi Lion', isCorrect: false },
                    { value: 'Titanic', isCorrect: true },
                    { value: 'Inception', isCorrect: false },
                    { value: 'Seul au monde', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La réplique "Je suis le roi du monde !" provient du film Titanic.',
                points: 1
            },
            {
                id: 2,
                question: 'Qui a réalisé le film de science-fiction épique "Blade Runner" ?',
                image: null,
                answers: [
                    { value: 'Steven Spielberg', isCorrect: false },
                    { value: 'Ridley Scott', isCorrect: true },
                    { value: 'George Lucas', isCorrect: false },
                    { value: 'James Cameron', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Ridley Scott est le réalisateur du film "Blade Runner".',
                points: 1
            },
            {
                id: 3,
                question: 'Quel groupe est connu pour la chanson "Stairway to Heaven" ?',
                image: null,
                answers: [
                    { value: 'The Rolling Stones', isCorrect: false },
                    { value: 'Led Zeppelin', isCorrect: true },
                    { value: 'The Beatles', isCorrect: false },
                    { value: 'Pink Floyd', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Led Zeppelin est connu pour la chanson "Stairway to Heaven".',
                points: 1
            },
            {
                id: 4,
                question: 'Quel film a remporté l\'Oscar du meilleur film en 1994 ?',
                image: null,
                answers: [
                    { value: 'Pulp Fiction', isCorrect: false },
                    { value: 'Forrest Gump', isCorrect: true },
                    { value: 'Les Évadés', isCorrect: false },
                    { value: 'Jurassic Park', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Forrest Gump a remporté l\'Oscar du meilleur film en 1994.',
                points: 1
            },
            {
                id: 5,
                question: 'Qui est un célèbre chanteur connu comme le "Roi de la Pop" ?',
                image: null,
                answers: [
                    { value: 'Elvis Presley', isCorrect: false },
                    { value: 'Michael Jackson', isCorrect: true },
                    { value: 'Prince', isCorrect: false },
                    { value: 'David Bowie', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Michael Jackson est connu comme le "Roi de la Pop".',
                points: 1
            },
            {
                id: 6,
                question: 'Quel film présente une célèbre scène de danse avec John Travolta et Uma Thurman ?',
                image: null,
                answers: [
                    { value: 'La Fièvre du samedi soir', isCorrect: false },
                    { value: 'Grease', isCorrect: false },
                    { value: 'Pulp Fiction', isCorrect: true },
                    { value: 'Footloose', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Pulp Fiction présente la célèbre scène de danse avec John Travolta et Uma Thurman.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel artiste a enregistré le single à succès "Rolling in the Deep" ?',
                image: null,
                answers: [
                    { value: 'Adele', isCorrect: true },
                    { value: 'Taylor Swift', isCorrect: false },
                    { value: 'Beyoncé', isCorrect: false },
                    { value: 'Lady Gaga', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Adele a enregistré le single à succès "Rolling in the Deep".',
                points: 1
            },
            {
                id: 8,
                question: 'Quel est le nom de l\'agent secret britannique fictif dans la série de films débutée dans les années 1960 ?',
                image: null,
                answers: [
                    { value: 'Jason Bourne', isCorrect: false },
                    { value: 'James Bond', isCorrect: true },
                    { value: 'Ethan Hunt', isCorrect: false },
                    { value: 'Jack Ryan', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'James Bond est le nom de l\'agent secret britannique fictif dans la série de films.',
                points: 1
            },
            {
                id: 9,
                question: 'Quel film de 1975 est célèbre pour son utilisation révolutionnaire des effets spéciaux et de la musique, notamment l\'utilisation d\'un motif simple mais terrifiant à deux notes ?',
                image: null,
                answers: [
                    { value: 'Star Wars', isCorrect: false },
                    { value: 'Les Dents de la mer', isCorrect: true },
                    { value: 'Alien', isCorrect: false },
                    { value: 'L\'Exorciste', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Les Dents de la mer est célèbre pour son utilisation révolutionnaire des effets spéciaux et sa musique simple mais terrifiante à deux notes.',
                points: 1
            },
            {
                id: 10,
                question: 'Quel artiste a joué de façon célèbre sur une guitare "Fender Stratocaster" ?',
                image: null,
                answers: [
                    { value: 'Eric Clapton', isCorrect: true },
                    { value: 'Jimi Hendrix', isCorrect: false },
                    { value: 'Jimmy Page', isCorrect: false },
                    { value: 'Keith Richards', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Eric Clapton a joué de façon célèbre sur une guitare "Fender Stratocaster".',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ009",
        title: 'Quiz sur l\'Environnement et la Géographie Mondiale',
        description: 'Élargissez vos connaissances sur les problématiques environnementales et la géographie mondiale.',
        categoryId: 5,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Quelle est la plus grande forêt tropicale du monde ?',
                image: null,
                answers: [
                    { value: 'Forêt tropicale du Congo', isCorrect: false },
                    { value: 'Forêt amazonienne', isCorrect: true },
                    { value: 'Forêt tropicale de Daintree', isCorrect: false },
                    { value: 'Forêt des Sundarbans', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La forêt amazonienne est la plus grande forêt tropicale du monde.',
                points: 1
            },
            {
                id: 2,
                question: 'Quel pays possède le plus grand nombre de lacs naturels ?',
                image: null,
                answers: [
                    { value: 'États-Unis', isCorrect: false },
                    { value: 'Canada', isCorrect: true },
                    { value: 'Russie', isCorrect: false },
                    { value: 'Finlande', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le Canada possède le plus grand nombre de lacs naturels de tous les pays du monde.',
                points: 1
            },
            {
                id: 3,
                question: 'Comment appelle-t-on le processus par lequel l\'eau circule continuellement entre la terre, l\'atmosphère et les océans ?',
                image: null,
                answers: [
                    { value: 'Le cycle du carbone', isCorrect: false },
                    { value: 'Le cycle de l\'eau', isCorrect: true },
                    { value: 'La photosynthèse', isCorrect: false },
                    { value: 'La condensation', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Ce processus est connu sous le nom de cycle de l\'eau.',
                points: 1
            },
            {
                id: 4,
                question: 'Quel continent est considéré comme le plus sec du monde ?',
                image: null,
                answers: [
                    { value: 'Asie', isCorrect: false },
                    { value: 'Australie', isCorrect: false },
                    { value: 'Antarctique', isCorrect: true },
                    { value: 'Afrique', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'Antarctique est considéré comme le continent le plus sec de la Terre.',
                points: 1
            },
            {
                id: 5,
                question: 'Quel phénomène naturel est mesuré par l\'échelle de Richter ?',
                image: null,
                answers: [
                    { value: 'Ouragans', isCorrect: false },
                    { value: 'Tremblements de terre', isCorrect: true },
                    { value: 'Tornades', isCorrect: false },
                    { value: 'Tsunamis', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'L\'échelle de Richter mesure l\'ampleur des tremblements de terre.',
                points: 1
            },
            {
                id: 6,
                question: 'Quelle couche de la Terre est composée de plaques tectoniques ?',
                image: null,
                answers: [
                    { value: 'Croûte', isCorrect: true },
                    { value: 'Manteau', isCorrect: false },
                    { value: 'Noyau', isCorrect: false },
                    { value: 'Lithosphère', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La croûte terrestre est composée de plaques tectoniques.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel gaz est le principal gaz à effet de serre contribuant au réchauffement climatique ?',
                image: null,
                answers: [
                    { value: 'Oxygène', isCorrect: false },
                    { value: 'Azote', isCorrect: false },
                    { value: 'Dioxyde de carbone', isCorrect: true },
                    { value: 'Hydrogène', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le dioxyde de carbone est le principal gaz à effet de serre contribuant au réchauffement climatique.',
                points: 1
            },
            {
                id: 8,
                question: 'Quel pays est le plus grand producteur d\'énergie solaire ?',
                image: null,
                answers: [
                    { value: 'États-Unis', isCorrect: false },
                    { value: 'Allemagne', isCorrect: false },
                    { value: 'Chine', isCorrect: true },
                    { value: 'Inde', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La Chine est le plus grand producteur d\'énergie solaire, menant le monde dans le déploiement de fermes photovoltaïques.',
                points: 1
            },
            {
                id: 9,
                question: 'Quel fleuve est le plus long du monde ?',
                image: null,
                answers: [
                    { value: 'Fleuve Amazone', isCorrect: false },
                    { value: 'Fleuve Nil', isCorrect: true },
                    { value: 'Fleuve Yangtsé', isCorrect: false },
                    { value: 'Fleuve Mississippi', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le fleuve Nil est souvent crédité comme étant le plus long fleuve du monde, bien que certaines sources puissent lister le fleuve Amazone comme le plus long selon les critères de mesure.',
                points: 1
            },
            {
                id: 10,
                question: 'Quel type d\'énergie est principalement produit par les éoliennes ?',
                image: null,
                answers: [
                    { value: 'Énergie mécanique', isCorrect: false },
                    { value: 'Énergie solaire', isCorrect: false },
                    { value: 'Énergie éolienne', isCorrect: true },
                    { value: 'Énergie géothermique', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Les éoliennes produisent principalement de l\'énergie éolienne, qui est convertie en énergie électrique.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ010",
        title: 'Quiz sur la Technologie et l\'Innovation',
        description: 'Testez vos connaissances sur les avancées technologiques les plus récentes et les innovations historiques.',
        categoryId: 1,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Qui est crédité de l\'invention du World Wide Web ?',
                image: null,
                answers: [
                    { value: 'Steve Jobs', isCorrect: false },
                    { value: 'Bill Gates', isCorrect: false },
                    { value: 'Tim Berners-Lee', isCorrect: true },
                    { value: 'Mark Zuckerberg', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Tim Berners-Lee est crédité de l\'invention du World Wide Web.',
                points: 1
            },
            {
                id: 2,
                question: 'En quelle année le premier iPhone a-t-il été lancé ?',
                image: null,
                answers: [
                    { value: '2007', isCorrect: true },
                    { value: '2005', isCorrect: false },
                    { value: '2010', isCorrect: false },
                    { value: '2000', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le premier iPhone a été lancé en 2007.',
                points: 1
            },
            {
                id: 3,
                question: 'Quelle technologie est essentielle pour le fonctionnement d\'une cryptomonnaie ?',
                image: null,
                answers: [
                    { value: 'Intelligence artificielle', isCorrect: false },
                    { value: 'Réalité virtuelle', isCorrect: false },
                    { value: 'Blockchain', isCorrect: true },
                    { value: 'Informatique quantique', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La blockchain est essentielle pour le fonctionnement d\'une cryptomonnaie.',
                points: 1
            },
            {
                id: 4,
                question: 'Quelle entreprise est connue pour le développement de la voiture électrique appelée "Model S" ?',
                image: null,
                answers: [
                    { value: 'Ford', isCorrect: false },
                    { value: 'Tesla', isCorrect: true },
                    { value: 'Nissan', isCorrect: false },
                    { value: 'Chevrolet', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Tesla est connue pour le développement de la voiture électrique "Model S".',
                points: 1
            },
            {
                id: 5,
                question: 'Quelle était la première machine programmable qui pourrait être décrite comme un ordinateur ?',
                image: null,
                answers: [
                    { value: 'La Machine Analytique', isCorrect: true },
                    { value: 'L\'ENIAC', isCorrect: false },
                    { value: 'L\'Apple I', isCorrect: false },
                    { value: 'L\'IBM PC', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La Machine Analytique, conçue par Charles Babbage, était la première machine programmable.',
                points: 1
            },
            {
                id: 6,
                question: 'Dans quel domaine est décerné le prix Turing ?',
                image: null,
                answers: [
                    { value: 'Médecine', isCorrect: false },
                    { value: 'Sciences informatiques', isCorrect: true },
                    { value: 'Physique', isCorrect: false },
                    { value: 'Chimie', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le prix Turing est décerné dans le domaine des sciences informatiques.',
                points: 1
            },
            {
                id: 7,
                question: 'Quel élément est utilisé dans la fabrication des panneaux solaires ?',
                image: null,
                answers: [
                    { value: 'Fer', isCorrect: false },
                    { value: 'Cuivre', isCorrect: false },
                    { value: 'Silicium', isCorrect: true },
                    { value: 'Plomb', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Le silicium est utilisé dans la fabrication des panneaux solaires.',
                points: 1
            },
            {
                id: 8,
                question: 'Quel est le nom du premier satellite artificiel de la Terre ?',
                image: null,
                answers: [
                    { value: 'Spoutnik 1', isCorrect: true },
                    { value: 'Voyager 1', isCorrect: false },
                    { value: 'Télescope spatial Hubble', isCorrect: false },
                    { value: 'ISS', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'Spoutnik 1 était le premier satellite artificiel de la Terre.',
                points: 1
            },
            {
                id: 9,
                question: 'Quelle innovation est créditée d\'avoir permis la Révolution industrielle ?',
                image: null,
                answers: [
                    { value: 'La machine à vapeur', isCorrect: true },
                    { value: 'La presse à imprimer', isCorrect: false },
                    { value: 'L\'ampoule électrique', isCorrect: false },
                    { value: 'Internet', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'La machine à vapeur est créditée d\'avoir permis la Révolution industrielle.',
                points: 1
            },
            {
                id: 10,
                question: 'Que signifie "HTTP" dans une adresse Web ?',
                image: null,
                answers: [
                    { value: 'High Transfer Text Protocol', isCorrect: false },
                    { value: 'Hyper Text Transfer Protocol', isCorrect: true },
                    { value: 'Hyper Transfer Text Process', isCorrect: false },
                    { value: 'High Text Transfer Process', isCorrect: false }
                ],
                allowMultipleChoice: false,
                explanation: 'HTTP signifie Hyper Text Transfer Protocol.',
                points: 1
            }
        ]
    },
    {
        id: "QUIZ011",
        title: 'Quiz sur Divers Sujets avec Réponses Multiples',
        description: 'Un ensemble de questions diversifiées couvrant différents domaines avec plusieurs réponses correctes possibles.',
        categoryId: 7,
        shuffleQuestion: true,
        shuffleAnswer: true,
        isVisible: true,
        creatorEmail: 'contact@baptistebronsin.be',
        createdAt: new Date(),
        questions: [
            {
                id: 1,
                question: 'Lesquels des éléments suivants sont des langages de programmation ? (Sélectionnez toutes les réponses applicables)',
                image: null,
                answers: [
                    { value: 'Python', isCorrect: true },
                    { value: 'Java', isCorrect: true },
                    { value: 'HTML', isCorrect: false },
                    { value: 'TypeScript', isCorrect: true }
                ],
                allowMultipleChoice: true,
                explanation: 'Python, Java et TypeScript sont tous des langages de programmation, tandis que HTML est un langage de balisage.',
                points: 2
            },
            {
                id: 2,
                question: 'Quels pays sont membres permanents du Conseil de sécurité des Nations Unies ? (Sélectionnez toutes les réponses applicables)',
                image: null,
                answers: [
                    { value: 'États-Unis', isCorrect: true },
                    { value: 'Allemagne', isCorrect: false },
                    { value: 'Chine', isCorrect: true },
                    { value: 'Russie', isCorrect: true },
                    { value: 'Royaume-Uni', isCorrect: true },
                    { value: 'Japon', isCorrect: false }
                ],
                allowMultipleChoice: true,
                explanation: 'Les membres permanents du Conseil de sécurité de l\'ONU sont les États-Unis, la Chine, la Russie et le Royaume-Uni.',
                points: 3
            },
            {
                id: 3,
                question: 'Quels éléments sont des gaz à température ambiante ? (Sélectionnez toutes les réponses applicables)',
                image: null,
                answers: [
                    { value: 'Oxygène', isCorrect: true },
                    { value: 'Carbone', isCorrect: false },
                    { value: 'Azote', isCorrect: true },
                    { value: 'Hélium', isCorrect: true },
                    { value: 'Fer', isCorrect: false }
                ],
                allowMultipleChoice: true,
                explanation: 'L\'oxygène, l\'azote et l\'hélium sont des gaz à température ambiante, tandis que le carbone et le fer sont des solides.',
                points: 2
            }
        ]
    }    
];


const sampleCategories: ICategory[] = [
    {
        id: 1,
        name: "Sciences et Technologies",
        description: "Explorez des questions fascinantes sur les sciences, les technologies et leurs innovations.",
        borderColor: "#3B82F6",
        backgroundColor: "#EFF6FF",
    },
    {
        id: 2,
        name: "Histoire et Géographie",
        description: "Découvrez des faits sur l'histoire mondiale et la géographie à travers des quiz captivants.",
        borderColor: "#F59E0B",
        backgroundColor: "#FFFBEB",
    },
    {
        id: 3,
        name: "Arts et Littérature",
        description: "Plongez dans le monde des arts, de la littérature classique et moderne.",
        borderColor: "#EC4899",
        backgroundColor: "#FDF2F8",
    },
    {
        id: 4,
        name: "Culture Pop et Cinéma",
        description: "Testez vos connaissances sur la culture populaire, les films et la musique à travers les époques.",
        borderColor: "#10B981",
        backgroundColor: "#ECFDF5",
    },
    {
        id: 5,
        name: "Environnement et Écologie",
        description: "Apprenez et testez vos connaissances sur l'environnement, l'écologie et les problématiques globales.",
        borderColor: "#8B5CF6",
        backgroundColor: "#F5F3FF",
    },
    {
        id: 6,
        name: "Sports et Loisirs",
        description: "Un large éventail de questions sur différents sports et activités de loisir pour les passionnés.",
        borderColor: "#EF4444",
        backgroundColor: "#FEF2F2",
    },
    {
        id: 7,
        name: "Découvertes et Innovations",
        description: "Explorez les grandes découvertes et innovations qui ont marqué l'histoire et façonné le monde moderne.",
        borderColor: "#FFD700",
        backgroundColor: "#FFFBE6"
    }    
]

const QuizContext = createContext<QuizContextType>({ quizzes: [], categories: [], addQuizze: () => {} });

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>(sampleQuizzes);
    const [categories, setCategories] = useState<ICategory[]>(sampleCategories);

    const addQuizze = (quiz: IQuiz) => {
        setQuizzes((prevQuizzes) => [...prevQuizzes, quiz]);
    };

    return (
        <QuizContext.Provider value={{ quizzes, categories, addQuizze }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);