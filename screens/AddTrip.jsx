import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';

export default function AddTrip() {
  const navigation = useNavigation();
  const user = useSelector(state=> state?.userSlice?.user); 
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrip = async () => {
    if (place && country) {
      setLoading(true)

      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user?.uid
      })
      setLoading(false)
      if (doc && doc?.id) {
        navigation.goBack()
      }
    } else {
      Snackbar.show({
        text: "Place and country are required",
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
            Add Trip
          </Text>
        </View>
        <View className="flex-row items-center justify-center my-3">
          <Image
            className="w-72 h-72"
            source={require('../assets/images/4.png')}
          />
        </View>
        <View>
          <Text className={`${colors.heading} font-bold text-lg mb-2`}>
            Where On Earth?
          </Text>
          <TextInput
            value={place}
            placeholder="Enter place"
            onChangeText={value => setPlace(value)}
            className="p-4 bg-white rounded-2xl mb-3"
          />
          <Text className={`${colors.heading} font-bold text-lg`}>
            Which Country?
          </Text>
          <TextInput
            value={country}
            placeholder="Enter country"
            onChangeText={value => setCountry(value)}
            className="p-4 bg-white rounded-2xl"
          />
        </View>

        <View>
          {loading ? (
            <Loader />
          ) : (
            <TouchableOpacity
              onPress={handleTrip}
              style={{backgroundColor: colors.button}}
              className=" rounded-2xl p-4">
              <Text className="text-center text-white font-bold text-lg">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
