import { DeviceDTO } from "./device.dto";

export class AreaDTO {
    uuid!: string;
    name!: string;
    description!: string;
    devices!: DeviceDTO[];
}