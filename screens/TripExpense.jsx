import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import ExpenseCard from '../components/ExpenseCard';
import { expensesRef } from '../config/firebase';
import { getDocs, query, where } from 'firebase/firestore';

const items = [
  {
    id: 1,
    title: 'Go to london',
    amount: '98',
    category: 'food',
  },
  {
    id: 2,
    title: 'Relaxed',
    amount: '546',
    category: 'other',
  },
  {
    id: 3,
    title: 'Buy egg',
    amount: '799',
    category: 'shopping',
  },
  {
    id: 4,
    title: 'Eat moi moi',
    amount: '6',
    category: 'entertainment',
  },
];

export default function TripExpense(props) {
  const {id, place, state} = props?.route?.params;
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([])

  const isFocused = useIsFocused()


  const fetchTrips = async ()=>{
    const q = query(expensesRef, where("tripId", "==", id))
    const querySnapshot = await getDocs(q)
    let data = [];
    querySnapshot.forEach(doc=>{
      data.push({...doc.data(), id: doc?.id})
    })
    setExpenses(data)
  }

  useEffect(() => {
   if (isFocused) {
   fetchTrips()
   }
  }, [isFocused])
  return (
    <View className="flex-1 flex-col gap-3 h-full p-3">
      <View className="flex-row mt-4 items-center">
        <BackButton />
        <View
          className={`${colors.heading} font-bold text-xl m-auto flex-col items-center`}>
          <Text className="text-xl font-bold">{place}</Text>
          <Text className="text-">{state}</Text>
        </View>
      </View>
      <View className="flex-row justify-center bg-blue-200 rounded-2xl ">
        <Image
          source={require('../assets/images/7.png')}
          className="w-60 h-60"
        />
      </View>

      <View className="flex-row justify-between">
        <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
        <TouchableOpacity
          onPress={()=> navigation.navigate('AddExpense', {id, place, state})} 
          className="p-2 px-3 bg-white border border-gray-200 rounded-2xl">
          <Text
            className={colors.heading}
            onPress={() => navigation.navigate('AddExpense')}>
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{height: 430}}>
        <FlatList
          data={expenses}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyList message="No Expense found :(" />}
          renderItem={({item}) => {
            return <ExpenseCard item={item} />;
          }}
        />
      </View>
      <View>
        <Text>koooo lopu</Text>
      </View>
    </View>
  );
}
