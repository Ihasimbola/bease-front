export const filters = [
  {
    id: 3,
    label: "Tout les matchs",
    mode: "all",
    active: false
  },
  {
    id: 0,
    label: "Les plus proches",
    mode: "bubble",
    active: true
  },
  {
    id: 1,
    label: "Par mois",
    mode: "byMonth",
    active: false,
    args: new Date().getMonth() + 1
  },
  
];

export const monthArgs = [
  {
    monthName: "Janvier",
    monthIdx: 1
  },
  {
    monthName: "Février",
    monthIdx: 2
  },
  {
    monthName: "Mars",
    monthIdx: 3
  },
  {
    monthName: "Avril",
    monthIdx: 4
  },
  {
    monthName: "Mai",
    monthIdx: 5
  },
  {
    monthName: "Juin",
    monthIdx: 6
  },
  {
    monthName: "Juillet",
    monthIdx: 7
  },
  {
    monthName: "Août",
    monthIdx: 8
  },
  {
    monthName: "Septembre",
    monthIdx: 9
  },
  {
    monthName: "Octobre",
    monthIdx: 10
  },
  {
    monthName: "Novembre",
    monthIdx: 11
  },
  {
    monthName: "Décembre",
    monthIdx: 12
  }
]