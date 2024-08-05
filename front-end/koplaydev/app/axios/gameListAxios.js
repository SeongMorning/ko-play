import API from "../utils/API";

export default async function gameListAxios() {
  return API.get("/games/", { params: { isRank: false } })
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}
