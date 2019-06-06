export class DeviceDTO {
    readonly uuid!: string;
    readonly name!: string;
    readonly macaddress!: string;
    readonly topic!: string;
    readonly description!: string;  
}

export class CreateDeviceDTO {
    readonly name!: string;
    readonly macaddress!: string;
    readonly topic!: string;
    readonly description!: string;  
}