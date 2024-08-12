import API from "../utils/API";

export default async function pictureAxios(image) {
  const formData = new FormData();
  formData.append("image", image);

  return API.post("/s3/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
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