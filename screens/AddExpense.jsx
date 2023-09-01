import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {categories} from '../contants';
import Snackbar from 'react-native-snackbar';
import {addDoc,} from 'firebase/firestore';
import Loader from '../components/Loader';
import { expensesRef } from '../config/firebase';

export default function AddExpense(props) {
  let {id} = props?.route?.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (title && amount) {
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        category,
        amount,
        tripId: id,
      });
      setLoading(false);
      if (doc && doc?.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Please fill all the fields',
        backgroundColor: 'red',
      });
    }
  };


  return (
    <ScreenWrapper>
      <View className="p-3 flex-col justify-between h-full">
        <View className="flex-row mt-4">
          <BackButton />
          <Text className={`${colors.heading} font-bold text-xl m-auto`}>
            Add Expense
          </Text>
        </View>
        <View className="flex-row items-center justify-center my-3">
          <Image
            className="w-72 h-72"
            source={require('../assets/images/expenseBanner.png')}
          />
        </View>
        <View>
          <Text className={`${colors.heading} font-bold text-lg mb-2`}>
            For What?
          </Text>
          <TextInput
            value={title}
            onChangeText={value => setTitle(value)}
            className="p-4 bg-white rounded-2xl mb-3"
          />
          <Text className={`${colors.heading} font-bold text-lg`}>
            How Much?
          </Text>
          <TextInput
            value={amount}
            onChangeText={value => setAmount(value)}
            className="p-4 bg-white rounded-2xl"
          />
        </View>

        <View>
          <Text className={`${colors.heading} font-bold text-lg`}>
            Category
          </Text>
          <View className="flex-row gap-3 flex-wrap">
            {categories.map(cat => {
              let bgColor = 'bg-white';
              if (cat.value === category) bgColor = 'bg-green-200';
              return (
                <TouchableOpacity
                  onPress={() => setCategory(cat.value)}
                  key={cat.value}
                  className={`rounded-full p-4 ${bgColor}`}>
                  <Text>{cat.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View>
          {loading ? (
            <Loader />
          ) : (
            <TouchableOpacity
              onPress={handleAddExpense}
              style={{backgroundColor: colors.button}}
              className=" rounded-2xl p-4">
              <Text className="text-center text-white font-bold text-lg">
                Add Expense
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
