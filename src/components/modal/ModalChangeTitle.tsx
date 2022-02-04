import React, { useEffect } from 'react';
import './modalChangeTitle.sass';
import { connect } from 'react-redux'
import { changeTitle } from '../../store/cardStore'

interface ModalProps {
    visible: boolean
    title: string
    cardTitle: string
    cardId: number
    changeTitle: (obj: {id: number, title: string}) => void
    onAccept: () => void
    onClose: () => void
}
  
const ModalChangeTitle = ({
    visible = false,
    title = '',
    cardId = 0,
    cardTitle = '',
    changeTitle,
    onAccept,
    onClose,
}: ModalProps) => {
    const [titleCard, setTitleCard] = React.useState(cardTitle)  

    useEffect(() => {
      setTitleCard(cardTitle);
    }, [cardTitle]);

    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'Escape':
          onClose()
          break
      }
    }
  
    const onChangeTitle = (event: any) => {     
      setTitleCard(event.target.value) 
    }
    const onAccepted = () => {   
      changeTitle({id: cardId, title: titleCard});  
      onAccept() 
    }
    const onLocalClose = () => {  
      setTitleCard(cardTitle)
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
            <div className='modal-content'><input value={titleCard} onChange={onChangeTitle}/></div>
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
  changeTitle
})(ModalChangeTitle)