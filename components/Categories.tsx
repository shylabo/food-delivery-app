import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '@/sanity'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const query = `
      *[_type == "category"]
    `
    sanityClient.fetch(query).then((data) => {
      setCategories(data)
    })
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category: any) => (
        <CategoryCard key={category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.name} />
      ))}
      {/* CategoryCard */}
    </ScrollView>
  )
}

export default Categories
