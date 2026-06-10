interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  constructor(private address: string) {}
  send(message: string) {
    console.log(`Email -> ${this.address} : ${message}`);
  }
}

class SmsNotification implements Notification {
  constructor(private phone: string) {}
  send(message: string) {
    console.log(`Sms -> ${this.phone} : ${message}`);
  }
}

class PushNotification implements Notification {
  constructor(private device: string) {}
  send(message: string) {
    console.log(`Push -> ${this.device} : ${message}`);
  }
}

abstract class NotificationSender {
  abstract createNotification(): Notification;

  notify(message: string): void {
    const notification = this.createNotification();
    notification.send(message);
  }

  notifyAll(messages: string[]): void {
    messages.forEach(message => {
      this.notify(message);
    });
  }
}

class EmailSender extends NotificationSender {
  constructor(private address: string) {
    super();
  }

  createNotification(): Notification {
    return new EmailNotification(this.address);
  }
}

class SmsSender extends NotificationSender {
  constructor(private phone: string) {
    super();
  }

  createNotification(): Notification {
    return new SmsNotification(this.phone);
  }
}

class PushSender extends NotificationSender {
  constructor(private device: string) {
    super();
  }

  createNotification(): Notification {
    return new PushNotification(this.device);
  }
}


// Client code
function alertUser(sender: NotificationSender): void {
  sender.notify("Message...");
}

function getUserPreferredChannel(): string {
  return 'email';
}

const sender = getUserPreferredChannel() === 'email'
  ? new EmailSender('user@example.com')
  : getUserPreferredChannel() === 'sms'
  ? new SmsSender('0610203040')
  : new PushSender('mobile');
