import API from "../utils/API";

export default async function gameResultAxios(
  gameIdx,
  correct,
  totalQuestion,
  gameLevel,
  gainedExp
) {
  console.log(gameIdx, correct, totalQuestion, gameLevel, gainedExp);
  return await API.post("/games/result", {
    gameIdx,
    correct,
    totalQuestion,
    gameLevel,
    gainedExp,
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}
