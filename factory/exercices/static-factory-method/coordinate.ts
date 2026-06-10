class Coordinate {
  private constructor(private readonly lat: number, private readonly lng: number) {}

  static fromDecimal(lat: number, lng: number): Coordinate {
    if (lat < -90 || lat > 90) {
      throw new Error("Invalid latitude");
    }

    if (lng < -180 || lng > 180) {
      throw new Error("Invalid longitude");
    }

    return new Coordinate(lat, lng);
  }

  static fromDMS(
    latDegrees: number,
    lngDegrees: number,
    latMinutes: number,
    lngMinutes: number,
    latSeconds: number,
    lngSeconds: number,
    latDirection: 'N' | 'S',
    lngDirection: 'E' | 'W'
  ): Coordinate {
    let lat = latDegrees + (latMinutes / 60) + (latSeconds / 3600);
    let lng = lngDegrees + (lngMinutes / 60) + (lngSeconds / 3600);

    return new Coordinate(latDirection === 'N' ? lat : -lat, lngDirection === 'E' ? lng : -lng);
  }

  static fromString(coordinate: string) {
    if (!coordinate.includes(',')) {
      throw new Error("Invalid character splitter");
    }

    const split = coordinate.split(',');
    return new Coordinate(Number(split[0]), Number(split[1]));
  }

  toDecimal() {
    return {
      latitude: this.lat,
      longitude: this.lng
    }
  }

  toString(): string {
    return `${this.lat}, ${this.lng}`;
  }
}
