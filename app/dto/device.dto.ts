import { AreaDTO } from "./area.dto";

export class DeviceDTO {
    uuid!: string;
    name!: string;
    macaddress!: string;
    topic!: string;
    description!: string;
    area!: AreaDTO;
}