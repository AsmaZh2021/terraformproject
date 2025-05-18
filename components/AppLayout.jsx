// Interface avec navigation conditionnelle (Split View)
import { useState, useEffect } from "react";

export default function AppLayout() {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("upload");

  useEffect(() => {
    fetch("/api/files/list").then(res => res.json()).then(setFiles);
    fetch("/api/user/list").then(res => res.json()).then(setUsers);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileInput) return;
    const res = await fetch("/api/s3/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fileInput.name, type: fileInput.type }),
    });
    const { uploadUrl } = await res.json();
    await fetch(uploadUrl, {
      method: "PUT",
      body: fileInput,
      headers: { "Content-Type": fileInput.type },
    });
    alert("Fichier uploadé dans S3 ✅");
  };

  const handleUserAdd = async (e) => {
    e.preventDefault();
    if (!userFile || !nom || !email) return;
    const res = await fetch("/api/s3/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userFile.name, type: userFile.type }),
    });
    const { uploadUrl, key } = await res.json();
    await fetch(uploadUrl, {
      method: "PUT",
      body: userFile,
      headers: { "Content-Type": userFile.type },
    });
    await fetch("/api/user/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nom, email, image: key }),
    });
    alert("Utilisateur ajouté ✅");
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <nav className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">📁 Projet S3 + RDS</h2>
        <button onClick={() => setSection("upload")} className="block w-full text-left hover:text-blue-400">➕ Ajouter Fichier</button>
        <button onClick={() => setSection("user")} className="block w-full text-left hover:text-blue-400">👤 Ajouter Utilisateur</button>
        <button onClick={() => setSection("files")} className="block w-full text-left hover:text-blue-400">📂 Liste Fichiers</button>
        <button onClick={() => setSection("users")} className="block w-full text-left hover:text-blue-400">📋 Liste Utilisateurs</button>
      </nav>

      {/* Contenu dynamique */}
      <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        {section === "upload" && (
          <section>
            <h3 className="text-2xl font-bold mb-4">Uploader un fichier</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <input type="file" onChange={e => setFileInput(e.target.files[0])} className="border p-2 rounded w-full" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Uploader</button>
            </form>
          </section>
        )}

        {section === "user" && (
          <section>
            <h3 className="text-2xl font-bold mb-4">Ajouter un utilisateur</h3>
            <form onSubmit={handleUserAdd} className="space-y-4">
              <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} className="border p-2 rounded w-full" />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded w-full" />
              <input type="file" onChange={e => setUserFile(e.target.files[0])} className="border p-2 rounded w-full" />
              <button className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
            </form>
          </section>
        )}

        {section === "files" && (
          <section>
            <h3 className="text-2xl font-bold mb-4">Liste des fichiers</h3>
            <ul className="bg-white rounded shadow p-4 space-y-2">
              {files.map((file, i) => (
                <li key={i} className="flex justify-between border-b pb-2">
                  {file.filename || file.Key}
                  <button className="text-red-600">🗑️</button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {section === "users" && (
          <section>
            <h3 className="text-2xl font-bold mb-4">Liste des utilisateurs</h3>
            <ul className="bg-white rounded shadow p-4 space-y-2">
              {users.map((user, i) => (
                <li key={i} className="flex justify-between border-b pb-2">
                  {user.name} ({user.email})
                  <button className="text-red-600">🗑️</button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}