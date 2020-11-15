self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    data: {
      url: data.url
    },
    requireInteraction: true,
  });
});

/**
 * On click, open url and close it.
 */
self.addEventListener('notificationclick', (event) => {
  if (clients.openWindow && event.notification.data.url) {
      event.waitUntil(clients.openWindow(event.notification.data.url));
      event.notification.close();
  }
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint);
      console.log('process.env', process.env);

      // return fetch(`${API_URL}/subscription`, {
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   method: 'POST',
      //   body: JSON.stringify({
      //     subscription: JSON.stringify(subscription),
      //     userId: user.userId
      //   })
      // });
    })
  );
});
