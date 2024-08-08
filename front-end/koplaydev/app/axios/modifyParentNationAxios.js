import API from "../utils/API";

export default async function modifyParentNationAxios(data) {
  return API.put(`/parent/nation?nation=${data}`)
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
