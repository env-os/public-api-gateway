import { Service } from 'typedi';
import { v4 as uuid } from 'uuid'
import axios, { AxiosInstance } from 'axios'

@Service()
export class MqttPublisherMicroservice {
    instance: AxiosInstance;
    constructor(){
        this.instance = axios.create({
            baseURL: process.env.MQTTPUBLISHER_MICROSERVICE_URL,
            headers: {'Content-Type': 'application/json'},
            timeout: 3000,
        })
    }


    public async publish(data: any): Promise<void> {
        await this.instance.post(`/mqtt`, data)
    }
}