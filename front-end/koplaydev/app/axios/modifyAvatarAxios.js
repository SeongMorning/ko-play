"use client"
import { setStudentAvatars } from "@/redux/slices/studentAvatarSlice";
import API from "../utils/API";
import { useDispatch } from "react-redux";

export default async function modifyAvatarAxios(data) {
  const dispatch = useDispatch();
  try {
    const { data } = await API.put("/students/avatar", data);
    
    dispatch(setStudentAvatars(data.data));
    return data.data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
