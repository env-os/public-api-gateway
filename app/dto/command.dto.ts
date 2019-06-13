import { DeviceDTO } from "./device.dto";

export class CommandDTO {
  uuid!: string;
  name!: string;
  description!: string;
  device!: DeviceDTO;
}