import API from "../utils/API";

export default async function allAvatarAxios() {
  try {
    const { data } = await API.get("/games/loadTop3students");
    return data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}