// import Image from "next/image";
// import Logo from '@/app/assets/Logo.png'

import OperatePanel from '@/app/components/operate-panel';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">

      {/* <header className="flex flex-row items-center">
        <Image src={Logo} alt="Logo" width={60} height={60} />
      </header> */}

      <div className="pt-2 flex justify-center">
        <div className="w-full rounded-lg">
          <OperatePanel />
        </div>
      </div>
    </main>
  );
}
