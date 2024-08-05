import API from "../utils/API";

export default async function myAvatarAxios() {
  try {
    const { data } = await API.get("students/avatars");
    return data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
