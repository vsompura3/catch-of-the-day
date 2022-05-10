import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
// import 'dotenv/config'

const firebaseConfig = {
  apiKey: `${import.meta.env.REACT_APP_FIREBASE_KEY}`,
  authDomain: 'catch-of-the-day-f9d04.firebaseapp.com',
  projectId: 'catch-of-the-day-f9d04',
  storageBucket: 'catch-of-the-day-f9d04.appspot.com',
  messagingSenderId: '424166388336',
  appId: '1:424166388336:web:cf384acf1041f6ae497ab5',
  measurementId: 'G-2CNPZ48JE1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)
const provider = new GithubAuthProvider()
const analytics = getAnalytics(app)

export { app, db, auth, provider }
// AAAAAAAAAAAAAAAAAAAAAO%2BBcAEAAAAA3snCsE0kyoK4CMIp1iKBQXzPW7A%3DkvbwTUpKocegLNpgjH0bXBoXaBe1T7BN3RgBb6fccbjSaCMtfG
// https://catch-of-the-day-f9d04.firebaseapp.com/__/auth/handler

// Twitter
// ClientID - cmxHRnpfdWxMZVAwWDFnb05lcWc6MTpjaQ
// Client Secret - idkC7E5xZbp72q7mb1puleMWq2EKdDnkZmfMWI6qhH3b_kjj7G

// API Key - uyljmb8mu07tTtoih2XsegydI
// API Secret - kmebrIHW1rCRjYVPzlkyRPjn4klZmr6UBqAl2Or2zg6evAOTVI

// Github
// ClientID - fc63a4a596f1195da4b8
// CLient Secret - 419a7e6aebd7046c22e2cc10a4ace53637ea4377
