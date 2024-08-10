// 효과음 재생에 사용

import { Howl } from 'howler';

export default function effectSound(src, volume = 1) {
    let sound;
    const soundInject = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
    }
    soundInject(src);
    return sound;
}