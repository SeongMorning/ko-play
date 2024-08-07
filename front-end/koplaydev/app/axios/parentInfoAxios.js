import API from "../utils/API";

export default async function parentInfoAxios() {
  return API.get("/parent/info")
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}