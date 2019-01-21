import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.emailAuthProvider = app.auth.EmailAuthProvider
    this.auth = app.auth()
    this.db = app.database()
    this.googleProvider = new app.auth.GoogleAuthProvider()
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()
            if (!dbUser.roles) dbUser.roles = []
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            }
            next(authUser)
          })
      } else fallback()
    })

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    })

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.updatePassword(password)

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')
}

export default Firebase
