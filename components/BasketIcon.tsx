import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from 'expo-router'

import { formatter } from '@/utils'
import { selectBasketItems, selectBasketTotal } from '@/features/basketSlice'

const BasketIcon = () => {
  const items = useSelector(selectBasketItems)
  const navigation = useNavigation()
  const basketTotal = useSelector(selectBasketTotal)

  const formattedTotalPrice = formatter.format(basketTotal)

  if (items.length === 0) return null

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate('basket')}
        className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
        <Text>View Basket</Text>
        <Text className="text-lg text-white font-extrabold">{formattedTotalPrice}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon
