import BlurBox from "../component/boxes/BlurBox";
import PinkBox from "../component/boxes/PinkBox";
import YellowBox from "../component/boxes/YellowBox";

export default function Test() {
  return (
    <>
      <BlurBox/>
      <YellowBox width={"70%"} height={"70%"}>12412412412412412</YellowBox>;
      {/* <PinkBox width={"20%"} height={"10%"} text={"입력값"}/> */}
    </>
  );
}
