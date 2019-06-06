import { JsonController, Get, Param, Post, Delete, Body, OnUndefined, Req, BadRequestError, NotFoundError } from 'routing-controllers';
import { Request } from 'express'
import { LogsUtil } from '../utils/logs.util';
import { DeviceService } from '../services/device.service';
import { CreateDeviceDTO } from '../dto/create-device.dto';
import { DeviceDTO } from '../dto/device.dto';

@JsonController('/devices')
export class DeviceController {
    constructor(
        private deviceService: DeviceService,
    ) {}

    @Post()
    @OnUndefined(201)
    public async create(@Body() deviceDto: CreateDeviceDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.deviceService.create(deviceDto)
        .catch(() => {
            throw new BadRequestError("Error during device creation.");
        })
    }

    @Delete('/:uuid')
    @OnUndefined(201)
    public async delete(@Param('uuid') uuid: string, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.deviceService.delete(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get()
    @OnUndefined(404)
    public async getAll(@Req() req: Request): Promise<DeviceDTO[]> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getAll()
        .catch(() => {
            throw new NotFoundError()
        })
    }

    @Get('/:uuid')
    @OnUndefined(404)
    public async getOneByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<DeviceDTO> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getOneByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }
}