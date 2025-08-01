import type { icons } from "~/components/icon";

export const matchTableHeader = [
  {
    label: "Horaire",
    dataKey: "horaire",
    iconName: "ChronoIcon"
  },
  {
    label: "Division",
    dataKey: "division",
    iconName: "DivisionIcon"
  },
  {
    label: "Equipe A",
    dataKey: "equipeA",
    iconName: "TeamIcon"
  },
  {
    label: "Equipe B",
    dataKey: "equipeB",
    iconName: "TeamIcon"
  },
  {
    label: "Arbitre",
    dataKey: "arbitre",
    iconName: "RefereeIcon"
  },
  {
    label: "Marqueur",
    dataKey: "marqueur",
    iconName: "MarqueurIcon"
  },
  {
    label: "Chronometreur",
    dataKey: "chronometreur",
    iconName: "ChronoIcon"
  },
  {
    label: "Buvette",
    dataKey: "buvette",
    iconName: "BuvetteIcon"
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

export const matchData = [
  {
    date: "05/05/2025",
    data: [
      {
        division: "DXU9 1",
        equipeA: "FSCL EGUISHEIM - 3",
        horaire: "14h00",
        equipeB: "BC KUNHEIM - 2",
        arbitre: "-",
        marqueur: "-",
        chronometreur: "-",
        buvette: "-",
        message: "-"
      },
      {
        division: "DFU11-P2",
        equipeA: "BERRWILLER/STAFFELFELDEN BC - 3",
        horaire: "17h00",
        equipeB: "BC KUNHEIM",
        arbitre: "-",
        marqueur: "-",
        chronometreur: "-",
        buvette: "-",
        message: "-"
      },
      {
        division: "DFU13",
        equipeA: "BC KUNHEIM - 2",
        equipeB: "BASKET CLUB 3 PAYS - 2",
        horaire: "13h00",
        arbitre: "-",
        marqueur: "Malone G.",
        chronometreur: "U13 Fille éq1",
        buvette: "-",
        message: "-"
      }
    ]
  },
  {
    date: "06/26/2025",
    data: [
      {
        division: "DFU13",
        equipeA: "BC KUNHEIM",
        equipeB: "BC ST GEORGES CARSPACH",
        horaire: "09h00",
        date: "26/05/2025",
        arbitre: "Hugo F.",
        marqueur: "-",
        chronometreur: "U13 Garcon",
        buvette: "Nathalie N.",
        message: "-"
      },
      {
        division: "DF2",
        equipeA: "BC KUNHEIM",
        equipeB: "CB KIENTZHEIM",
        horaire: "08h00",
        arbitre: "Hugo F.",
        marqueur: "-",
        chronometreur: "-",
        buvette: "Nathalie N.",
        message: "-"
      },
      {
        division: "PRM",
        equipeA: "CSC RUSTENHART - 1",
        equipeB: "BC KUNHEIM - 1",
        horaire: "10h00",
        arbitre: "-",
        marqueur: "-",
        chronometreur: "-",
        buvette: "-",
        message: "-"
      }
    ]
  },
  {
    date: "06/30/2025",
    data: [
      {
        division: "DFU13",
        equipeA: "BC KUNHEIM",
        equipeB: "BC ST GEORGES CARSPACH",
        horaire: "09h00",
        date: "26/05/2025",
        arbitre: "Hugo F.",
        marqueur: "-",
        chronometreur: "U13 Garcon",
        buvette: "Nathalie N.",
        message: "-"
      },
      {
        division: "DF2",
        equipeA: "BC KUNHEIM",
        equipeB: "CB KIENTZHEIM",
        horaire: "08h00",
        arbitre: "Hugo F.",
        marqueur: "-",
        chronometreur: "-",
        buvette: "Nathalie N.",
        message: "-"
      },
      {
        division: "PRM",
        equipeA: "CSC RUSTENHART - 1",
        equipeB: "BC KUNHEIM - 1",
        horaire: "10h00",
        arbitre: "-",
        marqueur: "-",
        chronometreur: "-",
        buvette: "-",
        message: "-"
      }
    ]
  },
  {
    date: "07/01/2025",
    data: [
      {
        division: "DFU13",
        equipeA: "BC KUNHEIM",
        equipeB: "BC ST GEORGES CARSPACH",
        horaire: "09h00",
        date: "26/05/2025",
        arbitre: "Hugo F.",
        marqueur: "-",
        chronometreur: "U13 Garcon",
        buvette: "Nathalie N.",
        message: "-"
      },
      {
        division: "DF2",
        equipeA: "BC KUNHEIM",
        equipeB: "CB KIENTZHEIM",
        horaire: "08h00",
        arbitre: "Hugo F.",
        marqueur: "-",
        chronometreur: "-",
        buvette: "Nathalie N.",
        message: "-"
      },
      {
        division: "PRM",
        equipeA: "CSC RUSTENHART - 1",
        equipeB: "BC KUNHEIM - 1",
        horaire: "10h00",
        arbitre: "-",
        marqueur: "-",
        chronometreur: "-",
        buvette: "-",
        message: "-"
      }
    ]
  },
]