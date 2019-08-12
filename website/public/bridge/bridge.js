const Asteroid = window.asteroid.createClass();
// Connect to a Meteor backend
const _asteroid = new Asteroid({
  endpoint: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`
});

const methods = {};

async function handleMessage(message) {
  if (!message.data.origin || message.data.origin !== 'embed') {
    return;
  }

  const handler = methods[message.data.method];
  if (!handler) {
    message.source.postMessage({
      origin: 'bridge',
      id: message.data.id,
      error: 'Invalid method',
    }, '*');
    return;
  }

  Promise.resolve(handler.apply(null, message.data.params))
    .then(result => message.source.postMessage({ origin: 'bridge', id: message.data.id, result }, '*'))
    .catch(error => message.source.postMessage({ origin: 'bridge', id: message.data.id, error }, '*'));
}

window.addEventListener('message', handleMessage, false);

function handleMethod(methodName, callback) {
  methods[methodName] = callback;
}

handleMethod('getLocalStorage', key => localStorage.getItem(key));
handleMethod('getUser', () => _asteroid.call('getUser'));

const loginToken = localStorage.getItem('Meteor.loginToken');
if (loginToken) {
  _asteroid.call('login', { resume: loginToken })
    .then((loginResult) => {
      if (loginResult.id) {
        console.log('Authenticated succesfully');
      } else {
        console.error('Authentication failed');
      }
      window.parent.postMessage({ ready: true, origin: 'bridge' }, '*');
    });
} else {
  console.log('User not authenticated, running in guest mode');
  window.parent.postMessage({ ready: true, origin: 'bridge' }, '*');
}
