interface Vehicle {
  cost: number;   // Price per km
  speed: number;  // km/h
}

abstract class LogisticsCompany {
  protected abstract createVehicle(): Vehicle;

  planRoute(distance: number): string {
    const vehicle = this.createVehicle();
    return `The trip will take ${distance / vehicle.speed} h and cost ${vehicle.cost * distance}€`;
  }
}

class RoadCompany extends LogisticsCompany {
  protected createVehicle(): Vehicle {
    return { cost: 2, speed: 80 };
  }
}

class AirCompany extends LogisticsCompany {
  protected createVehicle(): Vehicle {
    return { cost: 5, speed: 800 };
  }
}

class SeaCompany extends LogisticsCompany {
  protected createVehicle(): Vehicle {
    return { cost: 1, speed: 40 };
  }
}

const distance = 160;

const road = new RoadCompany();
console.log(road.planRoute(distance));
// The trip will take 2 h and cost 320€

const air = new AirCompany();
console.log(air.planRoute(distance));
// The trip will take 0.2 h and cost 800€

const sea = new SeaCompany();
console.log(sea.planRoute(distance));
// The trip will take 4 h and cost 160€
