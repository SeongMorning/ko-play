import styles from "./BtnContainer.module.scss";
import BlueBtn from "./BlueBtn";
export default function BtnContainer() {
  return (
    <>
      <BlueBtn
        width="10vw"
        height="7vh"
        top="60vh"
        left="55vw"
        radius="10vw"
        text="테스트"
      />
      <BlueBtn
        width="10vw"
        height="7vh"
        top="70vh"
        left="55vw"
        radius="10vw"
        text="모두 벗기"
      />
      <BlueBtn
        width="17vh"
        height="17vh"
        top="60vh"
        left="66vw"
        radius="2vw"
        text="적용하기"
      />
    </>
  );
}
