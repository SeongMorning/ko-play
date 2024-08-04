import API from "../utils/API";

export default async function album() {
  try {
    const { data } = await API.get("/students/snapshots");
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    console.log("Error Handling");
    return null;
  }
}
