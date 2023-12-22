import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { urlFor } from '@/sanity'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { addToBasket, removeFromBasket, selectBasketItemWithId } from '@/features/basketSlice'
import { formatter } from '@/utils'

interface DishRowProps {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const DishRow: React.FC<DishRowProps> = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false)
  const items = useSelector((state) => selectBasketItemWithId(state, id))
  const dispatch = useDispatch()

  const formattedPrice = formatter.format(price)

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }))
  }

  const removeItemFromBasket = () => {
    if (!(items.length > 0)) return
    dispatch(removeFromBasket({ id }))
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">{formattedPrice}</Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4',
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
              <FontAwesome name="minus-circle" size={32} color={items.length > 0 ? '#00CCBB' : 'gray'} />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <FontAwesome name="plus-circle" size={32} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow
