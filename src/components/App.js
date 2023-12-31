import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// Components
import Navigation from './Navigation';
import Swap from './Swap';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Charts from './Charts';
import Tabs from './Tabs';

import { loadProvider, loadNetwork, loadAccount, loadTokens, loadAMM } from '../store/interactions';


// Config: Import your network config here
// import config from '../config.json';


function App() {

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    
    const provider = await loadProvider(dispatch)
    const chainId = await loadNetwork(provider, dispatch)

    window.ethereum.on('accountsChanged', async () => {
      await loadAccount(dispatch)
    })
    window.ethereum.on('chainChanged', async () => {
      window.location.reload()
    })

    await loadTokens(provider, chainId, dispatch)
    await loadAMM(provider, chainId, dispatch)

  }

  useEffect(() => {
    loadBlockchainData()
  }, []);

  return(
    <Container>
      <HashRouter>
        <Navigation/>
        <hr />
        <Tabs/>
        <Routes>
          <Route exact path="/" element={<Swap />} />
          <Route exact path="/deposit" element={<Deposit />} />
          <Route exact path="/withdraw" element={<Withdraw />} />
          <Route exact path="/charts" element={<Charts />} />
        </Routes>
      </HashRouter>
    </Container>
  )
}

export default App;
