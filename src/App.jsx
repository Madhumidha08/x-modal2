import { useState } from 'react'
import Modal from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenForm = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className='app'>
      <h1 className='heading'>User Details Modal</h1>
      <button className='open-btn' onClick={handleOpenForm}>Open Form</button>  
      {isOpen && <Modal onClose={closeModal} /> } 
    </div>
  )
}

export default App;