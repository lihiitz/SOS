
console.log('Loaded service worker!');



self.addEventListener('push', ev => {
  const data = ev.data.json();

  console.log('showing', data)

  self.registration.showNotification(data.title, data.body);
});


self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function (clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});

self.addEventListener('notificationclick', function (event) {

  console.log('Notification Click.', event.action);

  if (!event.action) {
    // Was a normal notification click
    return;
  }

  switch (event.action) {
    case 'COOL':
      console.log('all cool');
      break;
    case 'SOS':
      console.log('sos!!!!');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});