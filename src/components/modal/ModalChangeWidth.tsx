import React, { useEffect } from 'react';
import './modalChangeWidth.sass';
import { connect } from 'react-redux'
import { changeWidth } from '../../store/cardStore'

interface ModalProps {
    visible: boolean
    title: string
    cardWidth: number
    cardId: number
    changeWidth: (obj: {id: number, width: number}) => void
    onAccept: () => void
    onClose: () => void
}
  
const ModalChangeWidth = ({
    visible = false,
    title = '',
    cardId = 0,
    cardWidth = 0,
    changeWidth,
    onAccept,
    onClose,
}: ModalProps) => {
    const [widthCard, setWidthCard] = React.useState(cardWidth)  

    useEffect(() => {
      setWidthCard(cardWidth);
    }, [cardWidth]);

    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'Escape':
          onClose()
          break
      }
    }
  
    const onChangeWidth = (event: any) => {     
      setWidthCard(event.target.value) 
    }
    const onAccepted = () => {    
      changeWidth({id: cardId, width: widthCard});   
      onAccept() 
    }
    const onLocalClose = () => {  
      setWidthCard(cardWidth)
      onClose() 
    }
    React.useEffect(() => {
      document.addEventListener('keydown', onKeydown)
      return () => document.removeEventListener('keydown', onKeydown)
    })
  

    if (!visible) return null
  

    return (
      <div className='modal' onClick={onLocalClose}>
        <div className='modal-dialog' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <h3 className='modal-title'>{title}</h3>
            <span className='modal-close' onClick={onLocalClose}>
              &times;
            </span>
          </div>
          <div className='modal-body'>
            <div className='modal-content'><input value={widthCard} onChange={onChangeWidth}/></div>
          </div>
          <div className='modal-footer'>           
            <button onClick={onAccepted}>Применить</button>
            <button onClick={onLocalClose}>Закрыть</button>           
          </div>
        </div>
      </div>
    )
  }
  let mapStateToProps = () => ({
  })
    
  export default connect(mapStateToProps, {
    changeWidth
  })(ModalChangeWidth)