import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';
import UserForm from '@/components/UserForm';

export default function Home() {
  return (
    <div>
      <h1>🗂️ Projet S3 + RDS</h1>
      <FileUpload />
      <FileList />
      <UserForm />
    </div>
  );
}
