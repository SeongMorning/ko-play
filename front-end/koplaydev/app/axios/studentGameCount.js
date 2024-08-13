import API from "../utils/API";

export default async function studentGameCount() {
  try {
    const { data } = await API.get("/students/gameCount");
    return data.data;
  } catch (error) {
    console.log(error);
    console.log("Error Handling");
    return null;
  }
}
