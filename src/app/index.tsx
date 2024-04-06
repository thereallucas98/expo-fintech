import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from '~/constants/colors'
import { defaultStyles } from '~/constants/styles'

const App = () => {
  const [assets] = useAssets([require('~/assets/videos/intro.mp4')])

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          style={styles.video}
          source={{
            uri: assets[0].uri,
          }}
          isMuted
          shouldPlay
          resizeMode={ResizeMode.COVER}
          isLooping
        />
      )}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Ready to change the way you money?
        </Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <Link
          href="/login"
          style={[defaultStyles.pillButton, styles.buttons, styles.loginButton]}
          asChild
        >
          <TouchableOpacity>
            <Text style={[{ color: '#fff' }, styles.buttonText]}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/sign-up"
          style={[
            defaultStyles.pillButton,
            styles.buttons,
            styles.signUpButton,
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    padding: 20,
    marginTop: 80,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  buttons: {
    flex: 1,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: Colors.dark,
  },
  signUpButton: {
    backgroundColor: '#FFF',
  },
})

export default App
