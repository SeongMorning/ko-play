import API from "../utils/API";

export default async function student() {
  try {
    const { data } = await API.get("/students/info");
    return data.data[0];
  } catch (error) {
    console.log(error);
    console.log("Error Handling");
    return null;
  }
}
