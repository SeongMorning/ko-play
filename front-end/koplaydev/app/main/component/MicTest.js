'use client'

import { useEffect, useRef } from 'react';

export default function MicTest() {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const audioContext = audioContextRef.current;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        
        analyserRef.current = analyser;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;
        
        draw();
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    const draw = () => {
      requestAnimationFrame(draw);
      if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current) {
        return;
      }

      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current;
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = '#FFD6E0';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 10;
      canvasCtx.strokeStyle = 'white';

      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 2.0) / analyser.fftSize;
      let x = 0;

      for (let i = 0; i < analyser.fftSize; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
        //   canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.stroke();
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} ></canvas>
    </div>
  );
}
