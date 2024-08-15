import API from "../utils/API";

export default async function modifyAvatarAxios(object) {
  // const dispatch = useDispatch();
  try {
    const data = await API.put("/students/avatar", object);
    // dispatch(setStudentAvatars(data.data));
    return data.data.data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
