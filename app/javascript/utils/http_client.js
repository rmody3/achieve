import axios from 'axios'

const httpClient = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

  return axios
}

export default httpClient()