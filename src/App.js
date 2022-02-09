import { Provider } from 'react-redux'
import { appStore } from './components/store/index'
import Table from './components/content/table'


function App() {

    return <Provider store={appStore}>
            <Table />
           </Provider>
  }
  
export default App;