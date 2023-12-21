import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import RestaurantCard from './RestaurantCard'
import sanityClient from '@/sanity'

interface FeaturedRowProps {
  id: string
  title: string
  description: string
}

const FeaturedRow: React.FC<FeaturedRowProps> = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    const query = `
    *[_type == 'featured' && _id == $id] {
      ...,
      restaurants[]-> {
        ...,
        dishes[]->,
          type -> {
            name
          }
      }
    }[0]
    `
    const params = { id }

    sanityClient.fetch(query, params).then((data) => {
      setRestaurants(data?.restaurants)
    })
  }, [id])

  console.log(restaurants)
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <FontAwesome name="arrow-right" color="#00CCBB" size={16} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants?.map((restaurant: any) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow
