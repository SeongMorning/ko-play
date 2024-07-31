import { useDispatch } from "react-redux";
import styles from "./BlueBox.module.scss";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function BlueBox(props) {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.BlueBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      onClick={()=>{
        dispatch(changeModalIdx(0));
      }}
    >
      <div className={styles.BlueBoxTop}>{props.text}</div>
      <div className={styles.BlueBoxBottom} />
    </div>
  );
}
