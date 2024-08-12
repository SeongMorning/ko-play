import API from "../utils/API";

export default async function modifyStudentInfoAxios(form) {
  try {
    const { data } = await API.put(
      "/students/info/img",
      { file: form },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
