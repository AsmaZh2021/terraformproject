import dynamic from 'next/dynamic';

const AppLayout = dynamic(() => import('../components/AppLayout'), { ssr: false });

export default function Home() {
  return <AppLayout />;
}
