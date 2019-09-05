import { Service } from 'typedi';
import { v4 as uuid } from 'uuid'
import { UsersMicroservice } from '../microservices/users.microservice';
import { DevicesMicroservice } from '../microservices/devices.microservice';
import { MqttPublisherMicroservice } from '../microservices/mqtt-publisher.microservice';
import { UserDTO } from '../dto/user.dto';
import { DeviceDTO } from '../dto/device.dto';
import { AreasMicroservice } from '../microservices/areas.microservice';
import { AreaDTO } from '../dto/area.dto';
import { CommandDTO } from '../dto/command.dto'

@Service()
export class EnvOSAggregator {
    constructor(
        private readonly usersMicroservice: UsersMicroservice,
        private readonly devicesMicroservice: DevicesMicroservice,
        private readonly areasMicroservice: AreasMicroservice,
        private readonly mqttPublisherMicroservice: MqttPublisherMicroservice,
    ) {}

    public async createUser(userDTO: UserDTO): Promise<void> {
        await this.usersMicroservice.createUser(userDTO);
    }

    public async deleteUser(uuid: string): Promise<void> {
        const userAreas = await this.usersMicroservice.getUserByUuid(uuid);
        for(let area of userAreas.areas){
            await this.areasMicroservice.deleteArea(area.uuid);
        }
        await this.usersMicroservice.deleteUser(uuid);
    }

    public async getUserByUuid(uuid: string): Promise<UserDTO> {
        let user = await this.usersMicroservice.getUserByUuid(uuid);
        for(let area of user.areas){
            const areaFromAreasMicroService = await this.areasMicroservice.getAreaByUuid(area.uuid);
            area = areaFromAreasMicroService;
        }
        return user;
    }

    public async getUserByEmail(email: string): Promise<UserDTO> {
        let user = await this.usersMicroservice.getUserByEmail(email);
        for(let area of user.areas){
            const areaFromAreasMicroService = await this.areasMicroservice.getAreaByUuid(area.uuid);
            area = areaFromAreasMicroService;
        }
        return user;
    }

    public async getUsers(): Promise<UserDTO[]> {
        return await this.usersMicroservice.getUsers();
    }

    public async createArea(areaDTO: AreaDTO, userUuid: string): Promise<void> {
        areaDTO.uuid = uuid();
        await this.areasMicroservice.createArea(areaDTO);
        await this.usersMicroservice.createArea(userUuid, areaDTO);
    }

    public async deleteArea(uuid: string, userUuid: string): Promise<void> {
        const areaDevices = await this.areasMicroservice.getAreaByUuid(uuid);
        for(let device of areaDevices.devices){
            await this.devicesMicroservice.deleteDevice(device.uuid);
        }
        await this.areasMicroservice.deleteArea(uuid);
        await this.usersMicroservice.deleteArea(uuid)
    }

    public async getAreaByUuid(userUuid: string, uuid: string): Promise<AreaDTO> {
        let area = await this.areasMicroservice.getAreaByUuid(uuid);
        for(let device of area.devices){
            const deviceFromDeviceMicroService = await this.devicesMicroservice.getDeviceByUuid(device.uuid);
            device = deviceFromDeviceMicroService;
        }
        return area;
    }

    public async getAreasOfUser(userUuid: string): Promise<AreaDTO[]> {
        let user = await this.usersMicroservice.getUserByUuid(userUuid);
        let areas:AreaDTO[] = new Array();
        for(let area of user.areas)
        {
            const areaFromAreasMicroService = await this.areasMicroservice.getAreaByUuid(area.uuid);
            areas.push(areaFromAreasMicroService);
        }
        return await areas;
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
        for(let command of device.commands){
            const commandFromDeviceMicroService = await this.devicesMicroservice.getCommandByUuid(command.uuid);
            command = commandFromDeviceMicroService;
        }
        return device;
    }

    public async getDevicesOfArea(areaUuid: string): Promise<DeviceDTO[]> {
        let area = await this.areasMicroservice.getAreaByUuid(areaUuid);
        let devices:DeviceDTO[] = new Array();
        for(let device of area.devices)
        {
            const deviceFromDeviceMicroService = await this.devicesMicroservice.getDeviceByUuid(device.uuid);
            devices.push(deviceFromDeviceMicroService);
        }
        return await devices;
    }

    public async createCommand(deviceUuid: string, commandDTO: CommandDTO): Promise<void> {
        commandDTO.uuid = uuid();
        commandDTO.device = await this.devicesMicroservice.getDeviceByUuid(deviceUuid);
        await this.devicesMicroservice.createCommand(commandDTO);
    }

    public async deleteCommand(deviceUuid: string, uuid: string): Promise<void> {
        await this.devicesMicroservice.deleteCommand(uuid);
    }

    public async getCommandByUuid(deviceUuid: string, uuid: string): Promise<CommandDTO> {
        let command = await this.devicesMicroservice.getCommandByUuid(uuid);
        return command;
    }

    public async getCommandsOfDevice(deviceUuid: string): Promise<CommandDTO[]> {
        let device = await this.devicesMicroservice.getDeviceByUuid(deviceUuid);
        let commands:CommandDTO[] = new Array();
        for(let command of device.commands)
        {
            const commandFromDeviceMicroService = await this.devicesMicroservice.getCommandByUuid(command.uuid);
            commands.push(commandFromDeviceMicroService);
        }
        return await commands;
    }

    public async publishMqtt(data: any): Promise<void> {
        await this.mqttPublisherMicroservice.publish(data);
    }
}