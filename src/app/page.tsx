import Image from "next/image";
import Logo from '@/app/assets/Logo.png'

import OperatePanel from '@/app/components/operate-panel';

export default function Home() {
  return (
    <main className="min-h-screen p-2 bg-transparent">

      <header className="flex flex-row items-center">
        <Image src={Logo} alt="Logo" width={60} height={60} />
      </header>

      <div className="mt-2 flex justify-center">
        <div className="w-[510px] border rounded-lg">
          <OperatePanel />
        </div>
      </div>
    </main>
  );
}
