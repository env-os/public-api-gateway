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