import React, { useState } from 'react'
import StopWatch from './components/StopWatch'
import './app.css'

function App() {
    const [watches, setWatches] = useState([])
    const [discardIds, setdiscardIds] = useState(0)

    const createStopWatch = () => {
        setWatches((prevWatches) => {

            let id = prevWatches.length

            if (discardIds > 0) {
                id += discardIds
            }
            
            const watch = {
                id
            }

            return [...prevWatches].concat([watch])
        })
    }

    const removeStopWatch = (stopWatchId) => {
        setdiscardIds((prevDiscardIds) => {
            return prevDiscardIds + 1
        })

        setWatches((prevWatches) => {
            return prevWatches.filter(watch => watch.id !== stopWatchId)
        })
    }

    return (
        <div className="stopwatch-container">
            <div className="stopwatch-container__heading">
                <p>Stopwatches</p>
                <button onClick={createStopWatch}>Create</button>
            </div>
            <div className="stopwatch-container__body">
                {
                    watches.length > 0 ?
                    (
                        <div className="stopwatch-list">
                            {
                                watches.map(watch => (<StopWatch key={watch.id} watchID={watch.id} remove={removeStopWatch} />))
                            }
                        </div>
                    ) :
                    (
                        <p style={{ textAlign: 'center' }}><em>No Watches Created !</em></p>
                    )
                }
            </div>
        </div>
    )
}

export default App
