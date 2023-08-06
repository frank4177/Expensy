import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {setLoading} from '../redux/features/userSlice';

export default function SignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.userSlice?.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email && password) {
      dispatch(setLoading(true));
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        Snackbar.show({
          text: err.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and password are required',
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
            Sign In
          </Text>
        </View>
        <View className="flex-row items-center justify-center my-3">
          <Image
            className="w-72 h-72"
            source={require('../assets/images/login.png')}
          />
        </View>
        <View className="space-y-2">
          <Text className={`${colors.heading} font-bold text-lg mb-2`}>
            Email
          </Text>
          <TextInput
            value={email}
            emailholder="Email"
            onChangeText={value => setEmail(value)}
            className="p-4 bg-white rounded-2xl mb-3"
          />
          <Text className={`${colors.heading} font-bold text-lg`}>
            Password
          </Text>
          <TextInput
            value={password}
            secureTextEntry
            emailholder="Password"
            onChangeText={value => setPassword(value)}
            className="p-4 bg-white rounded-2xl"
          />
          <TouchableOpacity className="flex-row justify-end">
            <Text>Forget Password</Text>
          </TouchableOpacity>
        </View>

        <View>
          {loading ? (
            <Loader />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{backgroundColor: colors.button}}
              className=" rounded-2xl p-4">
              <Text className="text-center text-white font-bold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
