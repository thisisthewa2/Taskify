/* 정규표현식 */
export const REG_EXP = {
  CHECK_EMAIL: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  CHECK_PASSWORD: /^[\Sa-zA-Z0-9]{8,}$/,
};

/* auth 에러메세지 */
export const ERROR_MESSAGES = {
  email: {
    emailField: '이메일을 입력해주세요',
    emailPattern: '이메일 형식으로 작성해 주세요',
    emailToVerify: '이메일을 확인해주세요',
  },
  password: {
    passwordField: '비밀번호를 입력해주세요',
    passwordPattern: '8자 이상 입력해 주세요',
    passwordToVerify: '비밀번호를 확인해주세요',
  },
};
