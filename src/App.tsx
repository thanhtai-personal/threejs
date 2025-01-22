import './App.css'
import { Tabs } from "components/Tabs"
import { Suspense, lazy } from "react"

const Skinning = lazy(() => import('components/Skinning'))

function App() {

  return (
    <div className="w-screen h-screen p-2">
      <Tabs tabs={[
        {
          key: 1,
          title: "Computer",
          content: <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
            <Skinning />
          </Suspense>
        }
      ]} />
    </div>
  )
}

export default App
