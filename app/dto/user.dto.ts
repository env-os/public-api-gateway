import { AreaDTO } from "./area.dto";

export class UserDTO {
    uuid!: string;
    username!: string;
    fullname!: string;
    email!: string;
    phone!: string;
    areas!: AreaDTO[];
}