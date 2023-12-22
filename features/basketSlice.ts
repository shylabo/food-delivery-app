import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload] as any
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item: any) => item.id === action.payload.id)
      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Can't resolve product (id: ${action.payload.id}) as its not in basket!`)
      }

      state.items = newBasket
    },
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state: any) => state.basket.items

export const selectBasketItemWithId = (state: any, id: string) =>
  state.basket.items.filter((item: any) => item.id === id)

export const selectBasketTotal = (state: any) =>
  state.basket.items.reduce((total: number, item: any) => (total += item.price), 0)

export default basketSlice.reducer
