import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

export default ({
  store,
  req,
  isDev
}) => {
  createPersistedState({
    key: 'authentication-cookie',
    paths: ['auth.access_token'],
    storage: {
      // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
      getItem: (key) => {
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie);
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      // js-cookie can handle setting both client-side and server-side cookies with one method
      // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
      setItem: (key, value) => 
        Cookies.set(key, value, {
          expires: inFifteenMinutes,
          secure: !isDev
        }),
      // also allow js-cookie to handle removing cookies
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}


// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie';
// import cookie from 'cookie';

// export default ({
//   store,
//   req
// }) => {
//   createPersistedState({
//     key: 'state',
//     paths: ['basket', 'user'],
//     storage: {
//       getItem: (key) => {
//         if (process.server) {
//           const parsedCookies = cookie.parse(req.headers.cookie);
//           return parsedCookies[key];
//         } else {
//           return Cookies.get(key);
//         }
//       },
//       setItem: (key, value) =>
//         Cookies.set(key, value, {
//           expires: 3,
//           secure: false
//         }),
//       removeItem: key => Cookies.remove(key)
//     }
//   })(store)
// }
