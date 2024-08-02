import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./Test.module.scss";
import WhiteTestBtn from "../WhiteTestBtn";
import { useDispatch, useSelector } from "react-redux";
import { changeTestIdx } from "@/redux/slices/testSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";

let testList = ["듣기 테스트", "화면 테스트", "마이크 테스트"];

export default function Test() {
  const testIdx = useSelector((state) => state.test);
  const dispatch = useDispatch();
  return (
    <YellowBox width={"60"} height={"80"}>
      <img
      src = "/close.png" 
      className={styles.backBtn}
      onClick={()=>{
        dispatch(changeTestIdx(1));
        dispatch(changeModalIdx(0));
      }}></img>
      <div className={styles.TestMain}>
        <div className={styles.TestDisplay}>
            <TestSelector idx={testIdx}/>
        </div>
        {testList.map((data, index) => 
          <WhiteTestBtn text={data} idx={index} />
        )}
      </div>
    </YellowBox>
  );
}

const TestSelector = (props)=>{
    if(props.idx === 1){
        return '화면등장';
    }else if(props.idx === 2){
        return <img style={{width : "30%", height : "80%"}} src="/MicTest.png"></img>;
    }else{
        return <img style={{width : "50%"}}src="/listentest.png"></img>;
    }
}