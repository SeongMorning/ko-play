import API from "../utils/API";

export default async function pictureAxios(image) {
  return API.post("/s3/s3/upload", {image : image})
    .then((res) => {
        console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      console.log("error Handling");
      return null;
    });
}