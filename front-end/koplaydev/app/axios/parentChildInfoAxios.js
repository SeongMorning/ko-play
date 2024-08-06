import API from "../utils/API";

export default async function parentChildInfoAxios() {
  try {
    const { data } = await API.get("/parent/child");
    return data.data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
