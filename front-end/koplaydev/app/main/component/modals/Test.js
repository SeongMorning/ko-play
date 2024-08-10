import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./Test.module.scss";
import WhiteTestBtn from "../WhiteTestBtn";
import { useDispatch, useSelector } from "react-redux";
import { changeTestIdx } from "@/redux/slices/testSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import Cam from "@/app/avatar/component/Cam";
import MicTest from "../MicTest";
import effectSound from '@/app/utils/effectSound'

let testList = ["화면 테스트", "마이크 테스트", "듣기 테스트"];
const buttonSound = '/audios/buttonSound.mp3';

export default function Test() {
  const testIdx = useSelector((state) => state.test);
  const dispatch = useDispatch();

  const es = effectSound(buttonSound, 1);

  return (
    <YellowBox width={"60"} height={"80"}>
      <img
        src="/close.png"
        className={styles.backBtn}
        onClick={() => {
          es.play();
          dispatch(changeTestIdx(1));
          dispatch(changeModalIdx(0));
        }}
      ></img>
      <div className={styles.TestMain}>
        <div className={styles.TestDisplay}>
          <TestSelector idx={testIdx} />
        </div>
        {testList.map((data, index) => (
          <WhiteTestBtn key={index} text={data} idx={index} />
        ))}
      </div>
    </YellowBox>
  );
}

const TestSelector = (props) => {
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kr-KR";
    window.speechSynthesis.speak(utterance);
  };

  if (props.idx === 1) {
    return <Cam width="40%" />;
  } else if (props.idx === 2) {
    return <MicTest />;
  } else {
    return (
      <>
        <img
          onClick={() => speakText("테스트 소리입니다. 테스트 소리입니다.")}
          style={{ width: "50%", cursor : "pointer" }}
          src="/listentest.png"
        ></img>
      </>
    );
  }
};
