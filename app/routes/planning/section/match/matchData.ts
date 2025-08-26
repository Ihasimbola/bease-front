import { _discriminatedUnion } from "zod/v4/core";
import type { icons } from "~/components/icon";

export const matchTableHeader = [
  {
    label: "Horaire",
    dataKey: "startTime",
    iconName: "ChronoIcon"
  },
  {
    label: "Terrain",
    dataKey: "place",
    iconName: "ChronoIcon"
  },
  {
    label: "Division",
    dataKey: "division",
    iconName: "DivisionIcon"
  },
  {
    label: "Equipe A",
    dataKey: "teamA",
    iconName: "TeamIcon"
  },
  {
    label: "Equipe B",
    dataKey: "teamB",
    iconName: "TeamIcon"
  },
  {
    label: "Message",
    dataKey: "message",
    iconName: "MessageIcon"
  }
] satisfies {
  label: string;
  dataKey: string;
  iconName: keyof typeof icons;
}[]

export const postTableHeader = [
  {
    label: "Arbitre",
    dataKey: "Arbitrage",
    iconName: "RefereeIcon"
  },
  {
    label: "Marqueur",
    dataKey: "Feuille de marque",
    iconName: "MarqueurIcon"
  },
  {
    label: "Chronometreur",
    dataKey: "Chronometreur",
    iconName: "ChronoIcon"
  },
  {
    label: "Buvette",
    dataKey: "Buvette",
    iconName: "BuvetteIcon"
  },
]

export const matchData = [
  {
    _id: "05/05/2025",
    matchs: [
      {
        division: "DXU9 1",
        teamA: "FSCL EGUISHEIM - 3",
        startTime: "14h00",
        teamB: "BC KUNHEIM - 2",
        place: "Salle des sports",
        posts: [
          {
            name: "Arbitrage",
            firstname: "hugo",
            lastname: "fournier",
            licensedId: "45daa458564fcecdeeea2c6c"
          },
          {
            name: "Feuille de marque",
            firstname: "malone",
            lastname: "guy",
            licensedId: "45daa458564fcecdeeea2c6c"
          },
          {
            name: "Chronometreur",
            firstname: "u9",
            lastname: "garcon",
            licensedId: "45daa458564fcecdeeea2c6c"
          },
          // {
          //   name: "Buvette",
          //   firstname: "nathalie",
          //   lastname: "n",
          //   licensedId: "45daa458564fcecdeeea2c6c"
          // }
        ],
        
        message: "-"
      },
      
    ]
  },
  // {
  //   _id: "06/26/2025",
  //   matchs: [
  //     {
  //       division: "DXU9 1",
  //       equipeA: "FSCL EGUISHEIM - 3",
  //       horaire: "14h00",
  //       equipeB: "BC KUNHEIM - 2",
  //       Arbitrage: {
  //         licensed: "Hugo F.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       "Feuille de marque": {
  //         licensed: "Malone G.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Chronometreur: {
  //         licensed: "U9 Garcon",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Buvette: {
  //         licensed: "Nathalie N.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       message: "-"
  //     },
  //     {
  //       division: "DXU9 1",
  //       equipeA: "FSCL EGUISHEIM - 3",
  //       horaire: "14h00",
  //       equipeB: "BC KUNHEIM - 2",
  //       Arbitrage: {
  //         licensed: "Hugo F.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       "Feuille de marque": {
  //         licensed: "Malone G.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Chronometreur: {
  //         licensed: "U9 Garcon",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Buvette: {
  //         licensed: "Nathalie N.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       message: "-"
  //     },
  //     {
  //       division: "DXU9 1",
  //       equipeA: "FSCL EGUISHEIM - 3",
  //       horaire: "14h00",
  //       equipeB: "BC KUNHEIM - 2",
  //       Arbitrage: {
  //         licensed: "Hugo F.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       "Feuille de marque": {
  //         licensed: "Malone G.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Chronometreur: {
  //         licensed: "U9 Garcon",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Buvette: {
  //         licensed: "Nathalie N.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       message: "-"
  //     }
  //   ]
  // },
  // {
  //   _id: "06/30/2025",
  //   matchs: [
  //     {
  //       division: "DXU9 1",
  //       equipeA: "FSCL EGUISHEIM - 3",
  //       horaire: "14h00",
  //       equipeB: "BC KUNHEIM - 2",
  //       Arbitrage: {
  //         licensed: "Hugo F.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       "Feuille de marque": {
  //         licensed: "Malone G.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Chronometreur: {
  //         licensed: "U9 Garcon",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Buvette: {
  //         licensed: "Nathalie N.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       message: "-"
  //     },
  //     {
  //       division: "DXU9 1",
  //       equipeA: "FSCL EGUISHEIM - 3",
  //       horaire: "14h00",
  //       equipeB: "BC KUNHEIM - 2",
  //       Arbitrage: {
  //         licensed: "Hugo F.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       "Feuille de marque": {
  //         licensed: "Malone G.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Chronometreur: {
  //         licensed: "U9 Garcon",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Buvette: {
  //         licensed: "Nathalie N.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       message: "-"
  //     },
  //     {
  //       division: "DXU9 1",
  //       equipeA: "FSCL EGUISHEIM - 3",
  //       horaire: "14h00",
  //       equipeB: "BC KUNHEIM - 2",
  //       Arbitrage: {
  //         licensed: "Hugo F.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       "Feuille de marque": {
  //         licensed: "Malone G.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Chronometreur: {
  //         licensed: "U9 Garcon",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       Buvette: {
  //         licensed: "Nathalie N.",
  //         _id: "45daa458564fcecdeeea2c6c",
  //       },
  //       message: "-"
  //     }
  //   ]
  // },
  
]