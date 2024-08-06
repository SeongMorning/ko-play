import API from "../utils/API";

export default async function studentStatisticsAxios(studentIdx) {
  return API.get("/students/", { params: { studentIdx } })
    .then((res) => {
      console.log(res.data.data)
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}
