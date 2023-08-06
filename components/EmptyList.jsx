import {View, Text, Image} from 'react-native';
import React from 'react';

export default function EmptyList({message}) {
  return (
    <View className="flex-col items-center">
      <Image
        className="w-36 h-36"
        source={require('../assets/images/empty.png')}
      />
      <Text className="text-gray-500 font-bold text-2xl">{message || "Data not found"}</Text>
    </View>
  );
}