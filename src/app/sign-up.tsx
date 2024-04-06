/* eslint-disable react/no-unescaped-entities */
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
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

  const router = useRouter()
  const { signUp } = useSignUp()

  const handleSignUp = useCallback(async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      })

      await signUp!.preparePhoneNumberVerification()

      router.push({
        pathname: '/verify/[phone]',
        params: { phone: fullPhoneNumber },
      })
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2))
    }
  }, [countryCode, phoneNumber, router, signUp])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: 80 }]}
            placeholder="+55"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            onChangeText={setCountryCode}
            value={countryCode}
          />

          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 20 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            value={phoneNumber}
            keyboardType="numeric"
            onChangeText={setPhoneNumber}
            autoFocus
          />
        </View>

        <Link href={'/login'} asChild replace>
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
          <Text style={[defaultStyles.buttonText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
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
