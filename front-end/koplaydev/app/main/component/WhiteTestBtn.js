import { changeTestIdx } from "@/redux/slices/testSlice";
import styles from "./WhiteTestBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";

export default function WhiteTestBtn(props) {
  const testIdx = useSelector((state) => state.test);
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(changeTestIdx(props.idx + 1));
        }}
        className={`${styles.WhiteTestBtn} ${props.idx + 1 === testIdx ? styles.click : ""}`}
      >
        {props.text}
      </div>
    </>
  );
}
