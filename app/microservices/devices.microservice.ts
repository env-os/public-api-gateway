import { Service } from 'typedi';
import { v4 as uuid } from 'uuid'
import axios, { AxiosInstance } from 'axios';
import { DeviceDTO } from '../dto/device.dto';

@Service()
export class DevicesMicroservice {
    instance: AxiosInstance;
    constructor(){
        this.instance = axios.create({
            baseURL: process.env.DEVICES_MICROSERVICE_URL,
            headers: {'Content-Type': 'application/json'},
            timeout: 3000,
        })
    }

    async createDevice(deviceDto: DeviceDTO): Promise<void> {
        await this.instance.post('/devices', {
            uuid: deviceDto.uuid,
            name: deviceDto.name,
            topic: deviceDto.topic,
            macaddress: deviceDto.macaddress,
            description: deviceDto.description,
        })
    }

    async deleteDevice(uuid: string): Promise<void> {
        await this.instance.delete(`/devices/${uuid}`);
    }

    public async getDeviceByUuid(uuid: string): Promise<DeviceDTO> {
        return await this.instance.get(`/devices/${uuid}`)
        .then((response) => {
            const device: DeviceDTO = response.data;
            return device;
        })
    }

    public async getDevices(): Promise<DeviceDTO[]> {
        return await this.instance.get('/devices')
        .then((response) => {
            const devices: DeviceDTO[] = response.data;
            return devices;
        })
    }
}