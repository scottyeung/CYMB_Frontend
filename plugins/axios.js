import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

export default function ({ $axios }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    if (process.env.NODE_ENV !== 'production') {
      config.httpsAgent = agent;
      console.log(config.httpsAgent)
    }
  });

}
