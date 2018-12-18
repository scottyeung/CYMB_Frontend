import https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false
})

export default function ({ $axios }) {
  $axios.onRequest(config => {
    if (process.env.NODE_ENV !== 'production') {
      config.httpsAgent = agent;
    }
  })
}
