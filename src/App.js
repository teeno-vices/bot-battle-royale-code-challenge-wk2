import { useEffect, useState } from 'react';
import './App.css';
import BotCollection from './components/BotCollection';
import BotSpecs from './components/BotSpecs';
import SortBar from './components/SortBar';
import YourBotArmy from './components/YourBotArmy';

function App() {
  const [allBots, setAllBots] = useState([])
  const [selectedBot, setSelectedBot] = useState(null)
  const [botArmy, setBotArmy] = useState([])
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then(r => r.json())
      .then(setAllBots)
      .catch(console.log)
  }, [])


  function handleDisplayBotInfo(id) {
    setSelectedBot(() => allBots.find(b => b.id === id))
  }

  function handleGoBack() {
    setSelectedBot(null)
  }

  function handleEnlist(id) {
    setBotArmy(army => [...army, allBots.find(b => b.id === id)])
    setSelectedBot(null)
  }

  function handleRetire(id) {
    fetch(`http://localhost:8001/bots/${id}`, { method: "DELETE" })
      .then(r => r.json())
      .then(() => {
        setSelectedBot(null)
        setAllBots(allBots => allBots.filter(b => b.id !== id))
      })
      .catch(console.log)
  }

  function handleRemoveEnlisted(id) {
    setBotArmy(army => army.filter(b => b.id !== id))
  }

  function handleSort(sortString) {
    setSortBy(sortString)
  }

  const onArmy = botArmy.map(b => b.id)
  const botsDisplay = allBots
    .filter(b => !onArmy.includes(b.id))
    .sort((a, b) => {
      if(sortBy === "damage"){
        return a[sortBy]- b[sortBy]
      }
      return b[sortBy] - a[sortBy]
    })
  return (
    <div className="App">
      {
        selectedBot ?
          <BotSpecs handleGoBack={handleGoBack} bot={selectedBot}
            handleEnlist={handleEnlist}
            handleRetire={handleRetire}
          /> :
          <>
            <YourBotArmy botArmy={botArmy}
              onRemoveBot={handleRemoveEnlisted}
            />
            <SortBar onSort={handleSort} activeSort={sortBy} />
            <BotCollection onRetireBot={handleRetire} bots={botsDisplay} onDisplayBotInfo={handleDisplayBotInfo} />
          </>
      }
    </div>
  );
}

export default App;
