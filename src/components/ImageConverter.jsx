import React, { useState } from 'react';

export default function ImageConverter() {
  const [file, setFile] = useState(null);
  const [dataObject, setDataObject] = useState(null);

  function selectFile(event) {
    setFile(event.target.files[0]);
  }

  function submit() {
    const reader = new FileReader();
    reader.onload = async function (event) {
      const content = event.target.result;
      setDataObject(content);
      /*
      jimp.read(content).then((image) => {
        image.getBase64('image/jpeg', (err, res) => {
          if (err) {
            console.error()
          }
          console.log(res)
        })
      })
      */
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className='image-converter'>
      {!!dataObject && (
        <>
          <img src={dataObject} />
          <br />
        </>
      )}
      <input type='file' onChange={selectFile} />
      <button onClick={submit}>Convert</button>
      <p>Note: WIP - Not working yet</p>
    </div>
  );
}
