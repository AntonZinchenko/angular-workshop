export class ConfigEnity {
  constructor(
    public id: string,
    public login: string,
    public email: string
) { }
}

export class AppSettingEnity {
  constructor(
    public title: string,
    public version: string
) { }
}
