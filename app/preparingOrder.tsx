import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from 'expo-router'

const preparingOrder = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate('delivery')
    }, 4000)
  }, [])
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require('../assets/images/orderLoading.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>
    </SafeAreaView>
  )
}

export default preparingOrder
