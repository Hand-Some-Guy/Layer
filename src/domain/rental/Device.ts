// 디바이스 밸류 객체
class Device {
  private readonly id: string;
  private readonly authKey: string;
  private readonly bleKey: string;

  constructor(id: string, auth: string, bleId: string) {
    if (!id || !auth || !bleId) throw new Error("Invalid device data");
    this.id = id;
    this.authKey = auth;
    this.bleKey = bleId;
  }

  toPersistence(): { deviceId: string; authKey: string; bleKey: string } {
    return {
      deviceId: this.id,
      authKey: this.authKey,
      bleKey: this.bleKey,
    };
  }

  getId(): string {
    return this.id;
  }

  getAuth(): string {
    return this.authKey;
  }

  getBleId(): string {
    return this.bleKey;
  }
}
