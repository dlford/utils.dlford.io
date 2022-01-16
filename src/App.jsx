import React from 'react';

import Frame from './components/Frame';
// import ImageConverter from './components/ImageConverter';
import Base64 from './components/Base64';

export default function App() {
  return (
    <Frame>
      <Base64 title='Base64' />
      {/* <ImageConverter title='Image Converter'/> */}
    </Frame>
  );
}
