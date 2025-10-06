export const handleDeleteSelect = (
  matchId: string,
  isChecked: boolean | string
) => {
  const selected = localStorage.getItem("matchToDelete");

  // if not exist
  if (!selected) {
    localStorage.setItem("matchToDelete", JSON.stringify([matchId]));
    return;
  }

  // if alredy exists
  const matchToDelete: Array<string> = JSON.parse(selected);
  if (Boolean(isChecked)) {
    // check if already in the array
    if (!matchToDelete.includes(matchId)) {
      matchToDelete.push(matchId);
      localStorage.setItem("matchToDelete", JSON.stringify(matchToDelete));
    }
  } else {
    console.log(matchToDelete.indexOf(matchId));
    matchToDelete.splice(matchToDelete.indexOf(matchId), 1);
    localStorage.setItem("matchToDelete", JSON.stringify(matchToDelete));
  }
};

export const handleIfChecked = (
  matchId: string,
  selectAllMatchContext?: boolean
) => {
  // if the user select all match checkbox then return true
  // if (selectAllMatchContext) {
  //   handleDeleteSelect(matchId, true);
  //   return true;
  // }

  const selected = localStorage.getItem("matchToDelete");

  return selected
    ? (JSON.parse(selected) as Array<string>).includes(matchId)
    : false;
};
