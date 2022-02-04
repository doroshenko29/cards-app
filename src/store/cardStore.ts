import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import cards from '../assets/cards'

// Define a type for the slice state
interface CardState {
  cards: {
    id: number
    title: string
    width: number
    content: JSX.Element[]
  }[]
}

// Define the initial state using that type
const initialState: CardState = {
    cards: cards
}

export const cardSlice = createSlice({
  name: 'card',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ id: number, context: JSX.Element}>) => {
        const id = action.payload.id
        let index = state.cards.findIndex((el) => el.id === id)
        if(index>=0){
            state.cards[index].content.push(action.payload.context)
        } 
    },
    removeCard: (state, action: PayloadAction<number>) => {
        const id = action.payload
        let index = state.cards.findIndex((el) => el.id === id)
        if(index>=0){
            let temp = state.cards.map(o => ({...o}))
            temp.splice(index, 1)
            state.cards = temp
        } 
    },
    moveCardUp: (state, action: PayloadAction<number>) => {
        const id = action.payload
        let index = state.cards.findIndex((el) => el.id === id)
        if(index>0){
            let temp = state.cards.map(o => ({...o}))
            const itemUpper = temp[index - 1]
            temp[index - 1] = temp[index]
            temp[index] = itemUpper
            state.cards = temp
        }
    },
    moveCardDown: (state, action: PayloadAction<number>) => {
        const id = action.payload
        let index = state.cards.findIndex((el) => el.id === id)
        if(index>=0 && index < state.cards.length - 1){
            let temp = state.cards.map(o => ({...o}))
            const itemUpper = temp[index + 1]
            temp[index + 1] = temp[index]
            temp[index] = itemUpper
            state.cards = temp
        }
    },
    changeTitle: (state, action: PayloadAction<{id: number, title: string}>) => {
        const id = action.payload.id
        let index = state.cards.findIndex((el) => el.id === id)
        if(index>=0){
            let temp = state.cards.map(o => ({...o}))
            temp[index].title = action.payload.title
            state.cards = temp          
        }
    },
    changeWidth: (state, action: PayloadAction<{id: number, width: number}>) => {
        const id = action.payload.id
        let index = state.cards.findIndex((el) => el.id === id)
        if(index>=0){
            let temp = state.cards.map(o => ({...o}))
            temp[index].width = action.payload.width
            state.cards = temp 
          }
    },
  },
})

export const { removeCard, addCard, changeTitle, changeWidth, moveCardUp, moveCardDown } = cardSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cards

export default cardSlice.reducer