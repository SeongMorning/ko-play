// "use client";

// import { useEffect, useRef } from "react";
// import { Howl } from "howler";

// export default function useSound(src, volume = 1, fadeoutTime = 0) {
//     const soundRef = useRef(null);

//     useEffect(() => {
//         const sound = new Howl({ src });
//         sound.volume(volume);
//         sound.play();
//         soundRef.current = sound;

//         sound.on("play", () => {
//             if (fadeoutTime > 0) {
//                 const duration = sound.duration() * 1000;
//                 const currentPosition = sound.seek() * 1000;
//                 const timeRemaining = duration - currentPosition;

//                 if (timeRemaining > fadeoutTime) {
//                     setTimeout(() => sound.fade(volume, 0, fadeoutTime), timeRemaining - fadeoutTime);
//                 }
//             }
//         });

//         return () => {
//             if (soundRef.current) {
//                 if (fadeoutTime > 0 && soundRef.current.playing()) {
//                     soundRef.current.fade(volume, 0, fadeoutTime);
//                     setTimeout(() => soundRef.current.stop(), fadeoutTime);
//                 } else {
//                     soundRef.current.stop();
//                 }
//             }
//         };
//     }, [src, volume, fadeoutTime]);
// }

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export default function useSound(src, volume = 1, fadeoutTime = 0) {
    const soundRef = useRef(null);

    const soundStop = () => {
        if (soundRef.current) {
            if (fadeoutTime > 0 && soundRef.current.playing()) {
                soundRef.current.fade(volume, 0, fadeoutTime);
                setTimeout(() => soundRef.current.stop(), fadeoutTime);
            } else {
                soundRef.current.stop();
            }
        }
    };

    useEffect(() => {
        if (!soundRef.current) {
            soundRef.current = new Howl({
                src,
                volume,
                loop: true, // 반복 재생 설정
            });

            soundRef.current.play();

            if (fadeoutTime > 0) {
                soundRef.current.on('play', () => {
                    const duration = soundRef.current.duration() * 1000;
                    const currentPosition = soundRef.current.seek() * 1000;
                    const timeRemaining = duration - currentPosition;

                    if (timeRemaining > fadeoutTime) {
                        setTimeout(() => soundRef.current.fade(volume, 0, fadeoutTime), timeRemaining - fadeoutTime);
                    }
                });
            }
        }

        return soundStop;
    }, [src, volume, fadeoutTime]);
}
