import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const App = () => {
  const captureRef = useRef(null);

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        //캡처로직
        /** 캡처시, 서버로 전송하는 로직
         * const App = () => {
  const captureRef = useRef(null);

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        // 캔버스를 Blob으로 변환
        canvas.toBlob(blob => {
          if (blob) {
            // FormData에 Blob 추가
            const formData = new FormData();
            formData.append('image', blob, 'capture.png');

            // 서버로 POST 요청
            fetch('/upload', {
              method: 'POST',
              body: formData,
            })
            .then(response => response.json())
            .then(data => {
              console.log('Image uploaded successfully:', data);
            })
            .catch(error => {
              console.error('Error uploading image:', error);
            });
          }
        }, 'image/png');
      });
    }
  };

         */
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'capture.png';
        link.click();
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div ref={captureRef} style={{ padding: '20px', border: '1px solid #ccc' }}>
        <h2>Capture this area</h2>
        <p>This content will be captured and downloaded as an image.</p>
      </div>
      <button onClick={handleCaptureClick} style={{ marginTop: '20px' }}>
        Capture Screenshot
      </button>
    </div>
  );
};

export default App;
