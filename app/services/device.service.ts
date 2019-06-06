import { Service } from 'typedi';
import { v4 as uuid } from 'uuid'
import axios, { AxiosInstance } from 'axios';
import { CreateDeviceDTO } from '../dto/create-device.dto';
import { DeviceDTO } from '../dto/device.dto';

@Service()
export class DeviceService {
    instance: AxiosInstance;
    constructor(){
        this.instance = axios.create({
            baseURL: process.env.DEVICES_SERVICE_URL,
            headers: {'Content-Type': 'application/json'},
            timeout: 3000,
        })
    }

    async create(deviceDto: CreateDeviceDTO): Promise<void> {
        await this.instance.post('/devices', {
            uuid: uuid(),
            name: deviceDto.name,
            topic: deviceDto.topic,
            macaddress: deviceDto.macaddress,
            description: deviceDto.description,
        })
    }

    async delete(uuid: string): Promise<void> {
        await this.instance.delete(`/devices/${uuid}`);
    }

    public async getOneByUuid(uuid: string): Promise<DeviceDTO> {
        return await this.instance.get(`/devices/${uuid}`)
        .then((response) => {
            const device: DeviceDTO = response.data;
            return device;
        })
    }

    public async getAll(): Promise<DeviceDTO[]> {
        return await this.instance.get('/devices')
        .then((response) => {
            const devices: DeviceDTO[] = response.data;
            return devices;
        })
    }
}