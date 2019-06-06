import { Service } from 'typedi';
import axios, { AxiosInstance } from 'axios'
import { UserDTO } from '../dto/user.dto';

@Service()
export class UserService {
    instance: AxiosInstance;
    constructor(){
        this.instance = axios.create({
            baseURL: process.env.USERS_SERVICE_URL,
            headers: {'Content-Type': 'application/json'},
            timeout: 3000,
        })
    }

    public async create(userDto: UserDTO): Promise<void> {
        await this.instance.post('/users', userDto)
    }

    public async delete(uuid: string): Promise<void> {
        await this.instance.delete(`/users/${uuid}`);
    }

    public async getAll(): Promise<UserDTO[]>{
        return await this.instance.get('/users')
        .then((response) => {
            const users: UserDTO[] = response.data;
            return users;
        })
    }

    public async getOneByUuid(uuid: string): Promise<UserDTO> {
        return await this.instance.get(`/users/${uuid}`)
        .then((response) => {
            const user: UserDTO = response.data;
            return user;
        })
    }
}
