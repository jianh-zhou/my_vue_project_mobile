export default {
  state: {
    phone: JSON.parse(window.localStorage.getItem('phone')) || ''
  }
}