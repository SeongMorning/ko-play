import API from "../utils/API";

export default async function studentStatisticsAxios(studentId) {
  return API.get("/students/mypage", { params: { studentId } })
    .then((res) => {
      return res.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}
