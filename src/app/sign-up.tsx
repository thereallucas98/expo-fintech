/* eslint-disable react/no-unescaped-entities */
import { Link } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import Colors from '~/constants/colors'
import { defaultStyles } from '~/constants/styles'

const SignUp = () => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
  const [countryCode, setCountryCode] = useState('+55')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSignUp = () => {}

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={styles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: 80 }]}
            placeholder="+55"
            placeholderTextColor={Colors.gray}
            onChangeText={setCountryCode}
            value={countryCode}
          />

          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 20 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoFocus
          />
        </View>

        <Link href={'/login'} asChild>
          <TouchableOpacity>
            <Text style={[defaultStyles.textLink]}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          disabled={!phoneNumber}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: Colors.gray,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    padding: 20,
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    fontSize: 20,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
})

export default SignUp
