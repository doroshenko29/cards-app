import React from "react";
import { connect } from 'react-redux'
import './card.sass';
import { addCard, removeCard, moveCardUp, moveCardDown } from '../../store/cardStore'

interface MyState {
    value: string  
    isActionsList: boolean 
}

interface MyProps {    
    cards: {
        id: number
        title: string
        width: number
        content: JSX.Element[]
      }[]  
    id: number
    removeCard: (id: number) => void
    openModal: (id: number) => void
    openChangeWidthModal: (id: number) => void
    addCard: (obj: {id: number, context: JSX.Element}) => void
    moveCardUp: (id: number) => void
    moveCardDown: (id: number) => void
}
class Card extends React.Component<MyProps, MyState>{   
    private actionList: React.RefObject<HTMLDivElement>;
    constructor(props: any){
        super(props)
        this.onToogleActionList = this.onToogleActionList.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
        this.state = {
            value: "changeTitle", 
            isActionsList: false,     
        }
        this.actionList = React.createRef();
    }
    onClickItem(value: string){       
        this.setState({value: value});
        switch (value){
            case "changeTitle": return this.changeTitle()
        };
        switch (value){
            case "changeWidth": return this.changeWidth()
        };
        switch (value){
            case "addCard": return this.addCard()
        };
        switch (value){
            case "removeCard": return this.removeCard()
        };
        switch (value){
            case "moveUp": return this.moveUp()
        };
        switch (value){
            case "moveDown": return this.moveDown()
        };
    }
    onToogleActionList(){
        this.setState((state)=> ({       
            isActionsList: !state.isActionsList
        }))
    }   
    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler)
		
	}
    onClickOutsideHandler(event: any){
        if(this.state.isActionsList && !this.actionList.current?.contains(event.target)){
            this.setState({
                isActionsList: false
            })
        }
    }
    changeTitle(){        
        this.props.openModal(this.props.id);
    }
    changeWidth(){
        this.props.openChangeWidthModal(this.props.id);       
    }
    addCard(){
        const temp = 
            <div className="card" style={{gridColumnEnd: this.props.cards[this.props.id].width}} >
                <div className="card-title">
                    <div className="card-title-name">
                        {this.props.cards[this.props.id].title}
                    </div>                                    
                </div>
                <div className="card-content">
                    {this.props.cards[this.props.id].content && this.props.cards[this.props.id].content.map((el) => (
                        el
                    ))}
                </div>
            </div>
        this.props.addCard({id: this.props.id, context: temp});
    }
    removeCard(){        
        this.props.removeCard(this.props.id);      
    }
    moveUp(){       
        this.props.moveCardUp(this.props.id);
    }
    moveDown(){     
        this.props.moveCardDown(this.props.id);
    }
    render(){
        return(
            <div className="card" style={{gridColumnEnd: this.props.cards[this.props.id].width}} >
                <div className="card-title">
                    <div className="card-title-name">
                        {this.props.cards[this.props.id].title}
                    </div>
                    <div className="card-actions" onClick={this.onToogleActionList} ref={this.actionList}>
                        Выберите действие
                        {this.state.isActionsList && <div className="card-actions-list">
                            <div className="card-actions-list-item" onClick={() => this.onClickItem('changeTitle')}>изменить название</div>
                            <div className="card-actions-list-item" onClick={() => this.onClickItem('changeWidth')}>изменить ширину</div>
                            <div className="card-actions-list-item" onClick={() => this.onClickItem('addCard')}>добавить карточку</div>
                            <div className="card-actions-list-item" onClick={() => this.onClickItem('removeCard')}>удалить карточку</div>
                            <div className="card-actions-list-item" onClick={() => this.onClickItem('moveUp')}>переместить вверх</div>
                            <div className="card-actions-list-item" onClick={() => this.onClickItem('moveDown')}>переместить вниз</div>
                        </div>}
                    </div>                   
                </div>
                <div className="card-content">
                    {this.props.cards[this.props.id].content && this.props.cards[this.props.id].content.map((el) => (
                        el
                    ))}
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state: any) => ({
    cards: state.cards
})

export default connect(mapStateToProps, {
	addCard, removeCard, moveCardUp, moveCardDown
})(Card)