import React from 'react'

type Props = {
    length: number,
    current: number
}

export default function StepProgress({current, length}: Props) {

    let bars = Array.from({length: length}, (_, i) => {
        return <div key={i} className={`w-full h-full rounded-full mx-1 ${i < current ? 'bg-lessprimary' : 'bg-gray-300'}`}></div>
    })

  return (
    <div className="w-full flex h-2">
        {bars}
    </div>
  )
}