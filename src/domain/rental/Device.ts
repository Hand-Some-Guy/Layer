// 디바이스 밸류 객체
class Device {
  private readonly id: string;
  private readonly authKey: string;
  private readonly bleKey: string;

  constructor(id: string, auth: string, bleId: string) {
    this.id = id;
    this.authKey = auth;
    this.bleKey = bleId;
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
