import { JsonController, Post, OnUndefined, Body, Req, BadRequestError, Delete, Param, NotFoundError, Get } from 'routing-controllers';
import { Request } from 'express'
import { EnvOSAggregator } from '../aggregators/envos.aggregator';
import { UserDTO } from '../dto/user.dto';
import { LogsUtil } from '../utils/logs.util';
import { AreaDTO } from '../dto/area.dto';
import { DeviceDTO } from '../dto/device.dto';
import { CommandDTO } from '../dto/command.dto';

@JsonController()
export class EnvOSController {
    constructor(
        private envOSAggregator: EnvOSAggregator,
    ) {}

    @Post('/users')
    @OnUndefined(201)
    public async createUser(@Body() userDto: UserDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.createUser(userDto)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Delete('/users/:uuid')
    @OnUndefined(201)
    public async deleteUser(@Param('uuid') uuid: string, @Req() req: Request) {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.deleteUser(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get('/users')
    @OnUndefined(404)
    public async getUsers(@Req() req: Request): Promise<UserDTO[]> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getUsers()
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get('/users/:uuid')
    @OnUndefined(404)
    public async getUserByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<UserDTO> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getUserByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Post('/areas')
    @OnUndefined(201)
    public async createArea(@Body() areaDTO: AreaDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.createArea(areaDTO)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Delete('/areas/:uuid')
    @OnUndefined(201)
    public async deleteArea(@Param('uuid') uuid: string, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.deleteArea(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get('/areas')
    @OnUndefined(201)
    public async getAreas(@Req() req: Request): Promise<AreaDTO[]> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getAreas()
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get('/areas/:uuid')
    @OnUndefined(201)
    public async getAreaByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<AreaDTO> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getAreaByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Post('/areas/:areaUuid/devices')
    @OnUndefined(201)
    public async createDevice(@Param('areaUuid') areaUuid: string, @Body() deviceDTO: DeviceDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.createDevice(areaUuid, deviceDTO)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Delete('/areas/:areaUuid/devices/:deviceUuid')
    @OnUndefined(201)
    public async deleteDevice(@Param('areaUuid') areaUuid: string, @Param('deviceUuid') deviceUuid: string, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.deleteDevice(areaUuid, deviceUuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get('/areas/:areaUuid/devices/:deviceUuid')
    @OnUndefined(404)
    public async getDeviceByUuid(@Param('areaUuid') areaUuid: string, @Param('deviceUuid') deviceUuid: string, @Req() req: Request): Promise<DeviceDTO> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getDeviceByUuid(areaUuid, deviceUuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get('/areas/:areaUuid/devices')
    @OnUndefined(404)
    public async getDevicesByArea(@Param('areaUuid') areaUuid: string, @Req() req: Request): Promise<DeviceDTO[]> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getDevices(areaUuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }



    @Post('/areas/:areaUuid/devices/:deviceUuid/commands')
    @OnUndefined(201)
    public async createCommand(@Param('areaUuid') areaUuid: string, @Param('deviceUuid') deviceUuid: string, @Body() commandDTO: CommandDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.createCommand(deviceUuid, commandDTO)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Delete('/areas/:areaUuid/devices/:deviceUuid/commands/:commandUuid')
    @OnUndefined(201)
    public async deleteCommand(@Param('areaUuid') areaUuid: string, @Param('deviceUuid') deviceUuid: string, @Param('commandUuid') commandUuid: string, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.envOSAggregator.deleteCommand(deviceUuid, commandUuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get('/areas/:areaUuid/devices/:deviceUuid/commands/:commandUuid')
    @OnUndefined(404)
    public async getCommandByUuid(@Param('areaUuid') areaUuid: string, @Param('deviceUuid') deviceUuid: string, @Param('commandUuid') commandUuid: string, @Req() req: Request): Promise<CommandDTO> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getCommandByUuid(deviceUuid, commandUuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get('/areas/:areaUuid/devices/:deviceUuid/commands/')
    @OnUndefined(404)
    public async getCommands(@Param('areaUuid') areaUuid: string, @Param('deviceUuid') deviceUuid: string, @Req() req: Request): Promise<CommandDTO[]> {
        LogsUtil.logRequest(req);
        return await this.envOSAggregator.getCommandsOfDevice(deviceUuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }
}