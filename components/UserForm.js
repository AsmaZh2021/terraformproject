import { useState } from 'react';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleInsert = async () => {
    const res = await fetch('/api/s3/upload', {
      method: 'POST',
      body: JSON.stringify({ name: image.name, type: image.type }),
      headers: { 'Content-Type': 'application/json' },
    });

    const { uploadUrl, key } = await res.json();
    await fetch(uploadUrl, {
      method: 'PUT',
      body: image,
      headers: { 'Content-Type': image.type },
    });

    await fetch('/api/user/insert', {
      method: 'POST',
      body: JSON.stringify({ name, email, image: key }),
      headers: { 'Content-Type': 'application/json' },
    });

    alert('Utilisateur ajouté');
  };

  const handleDelete = async () => {
    await fetch('/api/user/delete', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    alert('Utilisateur supprimé');
  };

  return (
    <div>
      <input placeholder="Nom" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleInsert}>Ajouter</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
}
