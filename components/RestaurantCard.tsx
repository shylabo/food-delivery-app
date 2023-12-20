import { Image, View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface RestaurantCardProps {
  id: number
  imgUrl: string
  title: string
  rating: number
  genre: string
  address: string
  short_description: string
  dishes: any[]
  long: number
  lat: number
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4 space-y-1">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <FontAwesome name="star" color="green" size={16} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text>• {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <FontAwesome name="location-arrow" color="gray" size={16} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard
