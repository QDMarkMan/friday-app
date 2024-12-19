// import Image from "next/image";
// import Logo from '@/app/assets/Logo.png'

import InStage from './components/in-stage';
import { Titlebar } from './components/titlebar';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent rounded-md">

      {/* <header className="flex flex-row items-center">
        <Image src={Logo} alt="Logo" width={60} height={60} />
      </header> */}
      <Titlebar />

      <div className="pt-1 flex justify-center">
        <div className="w-full rounded-lg">
          <InStage/>
        </div>
      </div>
    </main>
  );
}
