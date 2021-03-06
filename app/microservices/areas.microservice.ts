import { Service } from 'typedi';
import axios, { AxiosInstance } from 'axios'
import { AreaDTO } from '../dto/area.dto';
import { DeviceDTO } from '../dto/device.dto';

@Service()
export class AreasMicroservice {
    instance: AxiosInstance;
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:3002",
            headers: {'Content-Type': 'application/json'},
            timeout: 3000,
        })
    }

    public async createArea(areaDTO: AreaDTO): Promise<void> {
        await this.instance.post('/areas', {
            uuid: areaDTO.uuid,
            name: areaDTO.name,
            description: areaDTO.description,
        })
    }

    public async deleteArea(uuid: string): Promise<void> {
        await this.instance.delete(`/areas/${uuid}`);
    }

    public async getAreaByUuid(uuid: string): Promise<AreaDTO> {
        return await this.instance.get(`/areas/${uuid}`)
        .then((response) => {
            const area: AreaDTO = response.data;
            return area;
        })
    }

    public async getAreas(): Promise<AreaDTO[]> {
        return await this.instance.get(`/areas`)
        .then((response) => {
            const areas: AreaDTO[] = response.data;
            return areas;
        })
    }

    public async createDevice(areaUuid: string, deviceDTO: DeviceDTO): Promise<void> {
        await this.instance.post('/devices', {
            uuid: deviceDTO.uuid,
            area: areaUuid,
        })
    }

    public async deleteDevice(deviceUuid: string): Promise<void> {
        await this.instance.delete(`/devices/${deviceUuid}`);
    }

    public async getDeviceByUuid(deviceUuid: string): Promise<DeviceDTO> {
        return await this.instance.get(`/devices/${deviceUuid}`)
        .then((response) => {
            const device: DeviceDTO = response.data;
            return device;
        })
    }
}
