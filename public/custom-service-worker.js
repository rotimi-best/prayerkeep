self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    data: {
      url: data.url
    },

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
