import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: 'BDBDBD',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '416px',
    boxShadow: '0px 1px 6px 0px rgba(75, 75, 75, 0.20)'
};
  
const focusedStyle = {
    borderColor: '#2196f3'
};
  
const acceptStyle = {
    borderColor: '#00e676'
};
  
const rejectStyle = {
    borderColor: '#ff1744'
};
  
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const pStyle = {
    color: '#000',
    fontFamily: 'Couture',
    fontSize: '29px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '120%'
}

const Previews = ({getImages}) => {
  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps,
    isFocused,
    isDragAccept,
    isDragReject} = useDropzone({
    accept: {
        'image/jpeg': [],
        'image/jpg': [],
        'image/png': [],
    },
    maxFiles:1,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      getImages(acceptedFiles);
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <section className="container-fluid">
      <div {...getRootProps({className: 'dropzone'})} style={style}>
        <input {...getInputProps()} />
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
        <circle cx="64" cy="32" r="8" stroke="#BDBDBD" stroke-width="5"/>
        <path d="M8 40.6187L11.9229 40.0554C39.8358 36.0474 63.6951 60.1287 59.4286 88.0033M88 53.5417L84.1062 53.0026C72.7314 51.4276 62.439 57.0906 57.1384 66.0039" stroke="#BDBDBD" stroke-width="5" stroke-linecap="round"/>
        <path d="M8 48C8 29.1438 8 19.7157 13.8579 13.8579C19.7157 8 29.1438 8 48 8C66.8562 8 76.2843 8 82.1421 13.8579C88 19.7157 88 29.1438 88 48C88 66.8562 88 76.2843 82.1421 82.1421C76.2843 88 66.8562 88 48 88C29.1438 88 19.7157 88 13.8579 82.1421C8 76.2843 8 66.8562 8 48Z" stroke="black" stroke-width="5"/>
        </svg>
        <p style={pStyle}>Upload images</p>
        <aside style={thumbsContainer}>
            {thumbs}
        </aside>
      </div>
    </section>
  );
}
export default Previews;