import styles from "./ModalBox.module.scss";

export default function ModalBox() {
  return (
    <>
      <div className={styles.ModalBoxTop}>
      고민해야할 것들 1. 젤리 컴포넌트를 하나로 만들면 필요한 props 들 : 가로,
      세로, 배경 radius, 배경색, 텍스트, 그림자색, 하얀색 원1 가로 세로 radius,
      하얀색 원2 가로 세로 radius, ... 이정도면 그냥 따로 만드는게 어떤지?? 2.
      학생 로그인 입력 창 및 로그인 버튼 - 젤리로 통일성 줄건지 아니면 그냥
      지금처럼 평평하게 갈건지
      </div>
      <div className={styles.ModalBoxBottom} />
    </>
  );
}
