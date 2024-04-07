import { ExpoResponse } from 'expo-router/server'

export async function GET() {
  return ExpoResponse.json({ message: 'Hello from the API! ' })
}
