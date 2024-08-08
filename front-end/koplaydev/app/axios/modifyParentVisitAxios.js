import API from "../utils/API";

export default async function modifyParentVisitAxios() {
  return API.put("/parent/visit")
    .then((res) => {
        // console.log(res.data)
      return res.data.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}
