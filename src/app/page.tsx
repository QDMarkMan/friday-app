import InStage from './components/in-stage'
import { Titlebar } from './components/titlebar'

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent rounded-md text-sm">
      <Titlebar />

      <div className="pt-1 flex justify-center">
        <div className="w-full">
          <InStage />
        </div>
      </div>

      {/* <VersionFooter className="mt-1 p-1 bordered" /> */}
    </main>
  )
}
