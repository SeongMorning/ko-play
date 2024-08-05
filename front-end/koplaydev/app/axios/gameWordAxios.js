import API from "../utils/API";

export default async function gameWordAxios(gameIdx, level, amount) {
  return API.get("/games/words", {params : {gameIdx : gameIdx, level : level, amount : amount}})
    .then((res) => {
      console.log(res)
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}
