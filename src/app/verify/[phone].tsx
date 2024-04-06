import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo'
import { Link, useLocalSearchParams } from 'expo-router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

import Colors from '~/constants/colors'
import { defaultStyles } from '~/constants/styles'

const CELL_COUNT = 6

const Phone = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string
    signin: string
  }>()
  const [code, setCode] = useState('')

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  })
  const { signUp, setActive } = useSignUp()
  const { signIn } = useSignIn()

  const verifyCode = useCallback(async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      })

      await setActive!({ session: signUp!.createdSessionId })
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2))
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message)
      }
    }
  }, [code, setActive, signUp])

  const veryifySignIn = useCallback(async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      })

      await setActive!({ session: signIn!.createdSessionId })
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2))
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message)
      }
    }
  }, [code, setActive, signIn])

  useEffect(() => {
    if (code.length === 6) {
      if (signin === 'true') {
        veryifySignIn()
      } else {
        verifyCode()
      }
    }
  }, [code.length, signin, verifyCode, veryifySignIn])

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
})

export default Phone
