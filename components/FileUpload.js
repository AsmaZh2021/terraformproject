import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    try {
      // 1. Obtenir l'URL signée depuis l'API
      const res = await fetch('/api/s3/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: file.name,
          type: file.type,
        }),
      });

      if (!res.ok) {
        throw new Error('Échec de génération de l\'URL signée.');
      }

      const { uploadUrl, key } = await res.json();

      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      alert('✅ Fichier uploadé avec succès !');
    } catch (error) {
      console.error('Erreur handleUpload:', error);
      alert('Erreur durant l\'upload : ' + error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Uploader</button>
    </div>
  );
}
