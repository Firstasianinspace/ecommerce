export const handleFirebaseAuthError = (errorCode) => {
  if (errorCode === 'auth/user-not-found') return 'Пользователь не найден';
  if (errorCode === 'auth/wrong-password') return 'Неверный пароль';
  if (errorCode === 'auth/too-many-requests') return 'Слишком много запросов, аккаунт временно заблокирован. Подождите немного или смените пароль';
  if (errorCode === 'auth/email-already-in-use') return 'Пользователь с данным email уже зарегистрирован';
  if (errorCode === 'auth/invalid-email') return 'Неверный email';
  if (errorCode === 'auth/weak-password') return 'Слишком слабый пароль';
  if (!errorCode) return 'Unknown error';
}
