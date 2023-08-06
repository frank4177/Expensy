import { View, Text, ActivityIndicator} from 'react-native'
import React from 'react'
import { colors } from '../theme'

export default function Loader() {
  return (
    <View>
     <ActivityIndicator size="large" color={colors.button}/>
    </View>
  )
}