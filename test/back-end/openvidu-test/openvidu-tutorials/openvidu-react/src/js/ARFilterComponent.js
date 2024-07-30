// src/ARFilterComponent.js
import React, { useEffect, useRef } from 'react';
import * as facemesh from '@tensorflow-models/facemesh';
import * as THREE from 'three';
import FacePaint from './FacePaint';

const ARFilterComponent = ({ streamManager }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const setupAR = async () => {
      if (streamManager && videoRef.current && canvasRef.current) {
        const videoElement = streamManager.stream.getMediaStream().getVideoTracks()[0];
        const mediaStream = new MediaStream([videoElement]);
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();

        const model = await facemesh.load();

        const facePaint = new FacePaint({
          id: canvasRef.current.id,
          textureFilePath: './path-to-your-texture.jpg',
          w: videoRef.current.videoWidth,
          h: videoRef.current.videoHeight,
        });

        const renderPredictions = async () => {
          const predictions = await model.estimateFaces(videoRef.current);
          if (predictions.length > 0) {
            const positionBufferData = predictions[0].scaledMesh.flat();
            facePaint.render(positionBufferData);
          }
          requestAnimationFrame(renderPredictions);
        };

        renderPredictions();
      }
    };

    setupAR();
  }, [streamManager]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} id="faceCanvas" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ARFilterComponent;
