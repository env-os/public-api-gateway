import { Service } from 'typedi';
import { v4 as uuid } from 'uuid'
import { UsersMicroservice } from '../microservices/users.microservice';
import { DevicesMicroservice } from '../microservices/devices.microservice';
import { UserDTO } from '../dto/user.dto';
import { DeviceDTO } from '../dto/device.dto';
import { AreasMicroservice } from '../microservices/areas.microservice';
import { AreaDTO } from '../dto/area.dto';

@Service()
export class EnvOSAggregator {
    constructor(
        private readonly usersMicroservice: UsersMicroservice,
        private readonly devicesMicroservice: DevicesMicroservice,
        private readonly areasMicroservice: AreasMicroservice,
    ) {}

    public async createUser(userDTO: UserDTO): Promise<void> {
        userDTO.uuid = uuid();
        await this.usersMicroservice.createUser(userDTO);
    }

    public async deleteUser(uuid: string): Promise<void> {
        await this.usersMicroservice.deleteUser(uuid);
    }

    public async getUserByUuid(uuid: string): Promise<UserDTO> {
        return await this.usersMicroservice.getUserByUuid(uuid);
    }

    public async getUsers(): Promise<UserDTO[]> {
        return await this.usersMicroservice.getUsers();
    }

    public async createArea(areaDTO: AreaDTO): Promise<void> {
        areaDTO.uuid = uuid();
        await this.areasMicroservice.createArea(areaDTO);
    }

    public async deleteArea(uuid: string): Promise<void> {
        const areaDevices = await this.areasMicroservice.getDevicesByArea(uuid);
        for(let device of areaDevices){
            await this.devicesMicroservice.deleteDevice(device.uuid);
        }
        await this.areasMicroservice.deleteArea(uuid);
    }

    public async getAreaByUuid(uuid: string): Promise<AreaDTO> {
        let area = await this.areasMicroservice.getAreaByUuid(uuid);
        for(let device of area.devices){
            const deviceFromDeviceMicroService = await this.devicesMicroservice.getDeviceByUuid(device.uuid);
            device = deviceFromDeviceMicroService;
        }
        return area;
    }

    public async getAreas(): Promise<AreaDTO[]> {
        return await this.areasMicroservice.getAreas();
    }

    public async createDevice(areaUuid: string, deviceDTO: DeviceDTO): Promise<void> {
        deviceDTO.uuid = uuid();
        await this.devicesMicroservice.createDevice(deviceDTO);
        await this.areasMicroservice.createDevice(areaUuid, deviceDTO);
    }

    public async deleteDevice(areaUuid: string, uuid: string): Promise<void> {
        await this.devicesMicroservice.deleteDevice(uuid);
        await this.areasMicroservice.deleteDevice(uuid);
    }

    public async getDeviceByUuid(areaUuid: string, uuid: string): Promise<DeviceDTO> {
        let device = await this.devicesMicroservice.getDeviceByUuid(uuid);
        return device;
    }

    public async getDevices(areaUuid: string): Promise<DeviceDTO[]> {
        return await this.areasMicroservice.getDevicesByArea(areaUuid);
    }
}