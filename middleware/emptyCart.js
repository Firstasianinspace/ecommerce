export default function ({ store, redirect }) {
  // if (store.state.user.user === null) {
  //   return redirect('/')
  // }
  if (store.state.basket.basket.length === 0) {
    return redirect('/emptyCart')
  }
}