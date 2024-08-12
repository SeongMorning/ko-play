import API from "../utils/API";

export default async function student() {
  try {
    console.log("34");
    const { data } = await API.get("/students/info");
    return data.data[0];
  } catch (error) {
    console.log(error);
    console.log("Error Handling");
    return null;
  }
}
