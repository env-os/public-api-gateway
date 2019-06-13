import { AreaDTO } from "./area.dto";
import { CommandDTO } from "./command.dto";

export class DeviceDTO {
    uuid!: string;
    name!: string;
    macaddress!: string;
    topic!: string;
    description!: string;
    area!: AreaDTO;
    commands!: CommandDTO[];
}