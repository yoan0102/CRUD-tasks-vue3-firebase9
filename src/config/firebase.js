import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBRS7JsrStL6P_iS6eg1oW1UNBUw3zQN0E',
  authDomain: 'vue-demos-72de4.firebaseapp.com',
  databaseURL: 'https://vue-demos-72de4-default-rtdb.firebaseio.com',
  projectId: 'vue-demos-72de4',
  storageBucket: 'vue-demos-72de4.appspot.com',
  messagingSenderId: '819457693684',
  appId: '1:819457693684:web:fa8499434f0390490a0ba1'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
