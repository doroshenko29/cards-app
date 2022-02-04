import React from 'react';
import './App.css';
import Card from './components/Card';
import ModalChangeTitle from './components/modal/ModalChangeTitle';
import ModalChangeWidth from './components/modal/ModalChangeWidth';

import { useAppSelector } from './store/hooks'

function App() {
  const [isModal, setModal] = React.useState(false)
  const [modalId, setModalId] = React.useState(0)
  const [isModalChangeWidth, setModalChangeWidth] = React.useState(false)
  const [modalChangeWidthId, setModalChangeWidthId] = React.useState(0)
  const cardList = useAppSelector((state) => state.cards)
  console.log(cardList)
  const onClose = () => setModal(false)
  const onCloseModalChangeWidth = () => setModalChangeWidth(false)
  const openModal = (id: number) => {
    setModalId(id)
    setModal(true)
  }
  const openChangeWidthModal = (id: number) => {
    setModalChangeWidthId(id)
    setModalChangeWidth(true)
  }
  const onAccept = () => {
    setModal(false)   
  }
  const onAcceptWidth = () => {
    setModalChangeWidth(false)    
  }
  return (
    <div className="App">           
      <ModalChangeTitle
        visible={isModal}
        title='Изменить название карточки'
        cardTitle={cardList[modalId].title}   
        cardId={modalId}   
        onAccept={onAccept} 
        onClose={onClose}
      />
      <ModalChangeWidth
        visible={isModalChangeWidth}
        title='Изменить ширины карточки'
        cardWidth={cardList[modalId].width}   
        cardId={modalChangeWidthId}   
        onAccept={onAcceptWidth} 
        onClose={onCloseModalChangeWidth}
      />
      <div className="container">
        {cardList.map((el: { title: string; width: number; content: JSX.Element[]; id: number; }) => (
          <Card            
            id={el.id} 
            openModal={openModal} 
            openChangeWidthModal={openChangeWidthModal}       
            key={el.id}
          />
        ))}   
      </div> 
    </div>
  );
}

export default App;
