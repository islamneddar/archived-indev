import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
import {Response, Request} from "express";
import { CreateCatDto } from './dto/cats.dto';
import { CatsService } from './cats.service';

@Controller('cats')

export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get("/all")
    @HttpCode(201)
    findAll(@Req() request: Request, @Res() response : Response) {
        const cats = this.catsService.findAll();
        response.status(HttpStatus.OK).send({
            cats : cats
        })
    }

    @Get('/:id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Get()
    async findAllAsync(): Promise<any[]> {
        return [];
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }
}
