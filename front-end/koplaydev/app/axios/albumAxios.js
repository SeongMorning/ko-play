import API from "../utils/API";

export default async function albumAxios() {
  try {
    const { data } = await API.get("/students/snapshots");
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}