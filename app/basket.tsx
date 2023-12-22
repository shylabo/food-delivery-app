import React, { useEffect, useMemo, useState } from 'react'
import { Image, View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import { selectRestaurant } from '@/features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '@/features/basketSlice'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { urlFor } from '@/sanity'
import { formatter } from '@/utils'

const basket = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  const dispatch = useDispatch()

  useMemo(() => {
    const groupedItems = items.reduce((results: any, item: any) => {
      ;(results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  const deliveryFee = 5.99

  const formattedPriceForEachItem = formatter.format(items[0]?.price)
  const formattedSubtotal = formatter.format(basketTotal)
  const formattedDeliveryFee = formatter.format(deliveryFee)
  const formattedOrderTotal = formatter.format(basketTotal + deliveryFee)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5 p-2">
            <FontAwesome name="close" size={20} color="#00CCBB" height={20} width={20} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]: any) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image source={{ uri: urlFor(items[0]?.image).url() }} className="h-12 w-12 rounded-full" />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">{formattedPriceForEachItem}</Text>

              <TouchableOpacity>
                <Text className="text-[#00CCBB] text-xs" onPress={() => dispatch(removeFromBasket({ id: key }))}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">{formattedSubtotal}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">{formattedDeliveryFee}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">{formattedOrderTotal}</Text>
          </View>

          {/* @ts-ignore */}
          <TouchableOpacity onPress={navigation.navigate('preparingOrder')} className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default basket
