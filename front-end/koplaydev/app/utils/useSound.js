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

import { useEffect } from 'react'
import { Howl } from 'howler';

export default function useSound(src, volume = 1, fadeoutTime = 0) {
    let sound;
    const soundStop = () => sound.stop();
    const soundPlay = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
        sound.play();
    }

    useEffect(() => {
        soundPlay(src);
        sound.on('play', () => {
            const fadeouttime = fadeoutTime;
            setTimeout(() => sound.fade(volume, 0, fadeouttime), (sound.duration() - sound.seek()) * 1000 - fadeouttime);
        });
        return soundStop;
    }, []);
}
