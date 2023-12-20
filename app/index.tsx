import FontAwesome from '@expo/vector-icons/FontAwesome'
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'

const home = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <FontAwesome name="chevron-down" size={16} color="#00CCBB" />
          </Text>
        </View>

        <FontAwesome name="user" size={36} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 bg-gray-200 flex-1 p-3">
          <FontAwesome name="search" size={20} color="gray" />
          <TextInput placeholder="Restaurants and cuisines" keyboardType="default" />
        </View>

        <FontAwesome name="filter" size={20} color="#00CCBB" />
      </View>
    </SafeAreaView>
  )
}

export default home