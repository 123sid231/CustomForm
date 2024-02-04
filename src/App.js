import logo from './logo.svg';
import './App.css';
import CustomForm from './CustomForm/CustomForm';
import Form from './Form/Form';
import CustomButton from './SubComponents/Button/CustomButton';
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState('Build Form')
  return (
    <div className="App">
      <div className='mainContainer'>
        <div className='toggleWrapper'>
          <CustomButton name={'Build Form'} onClick={() => setTab('Build Form')} />
          <CustomButton name={'Preview'} onClick={() => setTab('Preview')} />
        </div>
        {tab === 'Build Form' ?
          <CustomForm />
          :
          < Form />
        }
      </div>
    </div>
  );
}

export default App;
