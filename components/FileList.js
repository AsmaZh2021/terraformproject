import { useEffect, useState } from 'react';

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/s3/list').then(res => res.json()).then(setFiles);
  }, []);

  const deleteFile = async (key) => {
    await fetch('/api/s3/delete', {
      method: 'POST',
      body: JSON.stringify({ key }),
      headers: { 'Content-Type': 'application/json' },
    });
    setFiles(files.filter(f => f.key !== key));
  };

  return (
    <ul>
      {files.map(file => (
        <li key={file.key}>
          {file.key} <button onClick={() => deleteFile(file.key)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}
