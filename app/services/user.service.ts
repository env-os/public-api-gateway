import { Service } from 'typedi';
import { v4 as uuid } from 'uuid'
import axios, { AxiosInstance } from 'axios'
import { UserDTO } from '../dto/user.dto';
import { CreateUserDTO } from '../dto/user.dto';

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

    public async create(userDto: CreateUserDTO): Promise<void> {
        await this.instance.post('/users', {
            uuid: uuid(),
            username: userDto.username,
            fullname: userDto.fullname,
            email: userDto.email,
            phone: userDto.phone
        })
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
