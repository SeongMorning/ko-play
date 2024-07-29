import MainBg from "../component/background/MainBg";
import styles from './page.module.scss';

export default function Test() {
  return (
    <>
      <MainBg />
      <svg
      className={styles.expBar}
        xmlns="http://www.w3.org/2000/svg"
        width="1728"
        height="167"
        viewBox="0 0 1728 167"
        fill="none"
      >
        <path
          d="M465.85 1L-1 90.474V140L465.85 36.1711H1291.24L1728 166V103.474L1291.24 1H465.85Z"
          fill="url(#paint0_linear_573_373)"
          stroke="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_573_373"
            x1="-1"
            y1="83.5"
            x2="1728"
            y2="83.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF8B8B" />
            <stop offset="0.306" stopColor="#969AFF" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
