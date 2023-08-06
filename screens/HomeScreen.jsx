import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useNavigation} from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const items = [
  {
    id: 1,
    place: 'Karu',
    state: 'Auja',
  },
  {
    id: 2,
    place: 'Ikeja',
    state: 'Lagos',
  },
  {
    id: 3,
    place: 'Owerri',
    state: 'Imo',
  },
  {
    id: 4,
    place: 'ibadan',
    state: 'Oyo',
  },
  {
    id: 5,
    place: 'Ikeja',
    state: 'Lagos',
  },
  {
    id: 6,
    place: 'Owerri',
    state: 'Imo',
  },
  {
    id: 7,
    place: 'ibadan',
    state: 'Oyo',
  },
];

const handleLogout = async ()=>{
  await signOut(auth)
}

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
 
      <View className="flex-1 flex-col gap-3 h-full p-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-3xl`}>
            Expensify
          </Text>
          <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-2xl">
            <Text className={colors.heading} onPress={handleLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center bg-blue-200 rounded-2xl ">
          <Image
            source={require('../assets/images/banner.png')}
            className="w-60 h-60"
          />
        </View>

        <View className="flex-row justify-between">
          <Text className={`${colors.heading} font-bold text-2xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="p-2 px-3 bg-white border border-gray-200 rounded-2xl">
            <Text className={colors.heading}>Add Trips</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 430}}>
          <FlatList
            data={items}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyList message="No trips found :(" />}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={()=> navigation.navigate("TripExpense", {...item})} className="flex-1 bg-white rounded-2xl p-2  w-[50%] m-2">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text
                      className={`${colors.heading} font-bold  text-[17px]`}>
                      {item.place}
                    </Text>
                    <Text className="text-gray-600">{item.state}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <Text>koooo lopu</Text>
        </View>
      </View>
   
  );
}
