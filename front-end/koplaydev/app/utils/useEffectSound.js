
// import { useEffect, useRef } from 'react';
// import { Howl } from 'howler';

// export default function useSound(src, volume = 1, fadeoutTime = 0) {
//     const soundRef = useRef(null);

//     const soundStop = () => {
//         if (soundRef.current) {
//             if (fadeoutTime > 0 && soundRef.current.playing()) {
//                 soundRef.current.fade(volume, 0, fadeoutTime);
//                 setTimeout(() => soundRef.current.stop(), fadeoutTime);
//             } else {
//                 soundRef.current.stop();
//             }
//         }
//     };

//     useEffect(() => {
//         if (!soundRef.current) {
//             soundRef.current = new Howl({
//                 src,
//                 volume,
//                 loop: true,
//                 html5: true
//             });

//             soundRef.current.play();

//             if (fadeoutTime > 0) {
//                 soundRef.current.on('play', () => {
//                     const duration = soundRef.current.duration() * 1000;
//                     const currentPosition = soundRef.current.seek() * 1000;
//                     const timeRemaining = duration - currentPosition;

//                     if (timeRemaining > fadeoutTime) {
//                         setTimeout(() => soundRef.current.fade(volume, 0, fadeoutTime), timeRemaining - fadeoutTime);
//                     }
//                 });
//             }
//         }

//         return soundStop;
//     }, [src, volume, fadeoutTime]);
// }

import { useEffect } from 'react';
import { Howl } from 'howler';

export default function useSound(src, volume = 1, fadeDuration = 2000, playbackRate = 1.0) {
  useEffect(() => {
    const sound = new Howl({
      src,
      volume,
      html5: true, // HTML5 Audio 사용 강제
      rate: playbackRate, // 재생 속도 설정
    });

    sound.play();

    // 페이드 인 효과를 적용
    sound.fade(0, volume, fadeDuration);

    return () => {
      // 컴포넌트가 언마운트될 때 소리를 정지하고 리소스를 정리
      sound.fade(volume, 0, fadeDuration);
      sound.once('fade', () => sound.stop());
    };
  }, [src, volume, fadeDuration]);
}
