import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Link, Stack, useRouter, useSegments } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Colors from '~/constants/colors'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {}
  },
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] === '(authenticated)'

    console.log('inAuthGroup', inAuthGroup)
    console.log('isSignedIn', isSignedIn)

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/home')
    } else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isLoaded, isSignedIn, router, segments])

  if (!loaded || !isLoaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{
          title: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href="/help" asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={34}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="help"
        options={{ title: 'Help', presentation: 'modal' }}
      />

      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  )
}

function RootLayoutNav() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

export default RootLayoutNav
