import API from "../utils/API";

export default async function pictureAxios(image, folder) {
  return API.post("/s3/upload", {"image": image, "folder":folder}, {
    headers: {
      "Content-Type" : "multipart/form-data",
    },
  })
    .then((res) => {
      console.log(res.data.body.data[0])
      return res.data.body.data[0];
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}