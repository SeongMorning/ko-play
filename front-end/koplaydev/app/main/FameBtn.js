"use client";

import styles from "./FameBtn.module.scss";

export default function FameBtn() {
  let array = Array(30).fill(0);
  return (
    <div>
      <div className={styles.FameText}>
        <img src="/fame.png" alt="" />
        <span>명예의 전당을 확인하세요</span>
      </div>
      <table className={styles.FameBtn}>
        <tbody>
          {[...Array(4)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {array.map((_, colIndex) => (
                <td key={colIndex + rowIndex * array.length}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
