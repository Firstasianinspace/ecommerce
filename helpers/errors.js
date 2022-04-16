export const handleFirebaseAuthError = (errorCode) => {
  if (errorCode === 'auth/user-not-found') return 'Пользователь не найден';
  if (errorCode === 'auth/wrong-password') return 'Неверный пароль';
  if (errorCode === 'auth/too-many-requests') return 'Слишком много запросов, аккаунт временно заблокирован. Подождите немного или смените пароль';
  if (errorCode === 'auth/email-already-in-use') return 'Пользователь с данным email уже зарегистрирован';
  if (errorCode === 'auth/invalid-email') return 'Неверный email';
  if (errorCode === 'auth/weak-password') return 'Слишком слабый пароль';
  if (!errorCode) return 'Unknown error';
}

export const getErrorMap = (context = {}) => ({
  required: `Это поле является обязательным`,
  minLength: `Это поле должно быть больше чем ${context?.$params?.minLength?.min} символов`,
  phoneLength: 'Телефон некорректный',
  isCurrentPassword: 'Введен неверный пароль',
  passwordIsSame: 'Пароли не совпадают',
  cvvIsSame: 'CVV/CVC не совпадают',
  passwordValidation:
    'Пароль должен содержать более 8 символов, латинские буквы в верхнем и нижнем регистре, а также цифры',
  email:
    'Адрес электронной почты должен содержать символ @, разрешены символы . - и _',
  birthDayValidation: 'Введите корректную дату рождения дд.мм.гггг',
  birthDayCorrectYears: 'Введите корректный год рождения',
  isOverEighteen: 'Возраст должен быть совершеннолетним',
  incorrectMonth: 'Месяц введен некорректный',
  incorrectDayInMonth: 'День введен некорректный',
  fileSize: 'Размер файла превышает допустимый',
  noQuestionMarks: 'Из спецсимволов можно использовать только . - и _',
  specialCharsValidator: 'Разрешены символы . - и _',
  nameStringValidator: 'Разрешены только буквы, дефисы и пробелы',
});

export const getError = ({ context = {}, field }) =>
  getErrorMap(context)[field] || '';
