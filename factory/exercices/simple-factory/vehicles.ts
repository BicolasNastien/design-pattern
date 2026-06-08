interface DeliveryVehicle {
  capacity: number;
  speed: number;
  deliver(): void;
}

class Scooter implements DeliveryVehicle {
  capacity: number = 10;
  speed: number = 50;

  deliver(): void {
    console.log(`${this.capacity} kg delivered at ${this.speed} km/h.`);
  }
}

class Van implements DeliveryVehicle {
  capacity: number = 500;
  speed: number = 130;

  deliver(): void {
    console.log(`${this.capacity} kg delivered at ${this.speed} km/h.`);
  }
}

class Drone implements DeliveryVehicle {
  capacity: number = 5;
  speed: number = 90;

  deliver(): void {
    console.log(`${this.capacity} kg delivered at ${this.speed} km/h.`);
  }
}

class DeliveryVehicleFactory {
  static create(type: 'scooter' |'van' | 'drone'): DeliveryVehicle {
    switch (type) {
      case 'scooter': return new Scooter();
      case 'van': return new Van();
      case 'drone': return new Drone();
      default: throw new Error('DeliveryVehicle not implemented.');
    }
  }
}

// Client code
const scooter = DeliveryVehicleFactory.create('scooter');
const van = DeliveryVehicleFactory.create('van');
const drone = DeliveryVehicleFactory.create('drone');
const boat = DeliveryVehicleFactory.create('boat'); // ERROR

scooter.deliver();  // 10 kg delivered at 50 km/h.
van.deliver();      // 500 kg delivered at 130 km/h.
drone.deliver();    // 5 kg delivered at 90km/h.
