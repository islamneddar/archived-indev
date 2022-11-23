import {TypeOrmModule} from "@nestjs/typeorm";
import {SourceBlogEntity} from "../bussiness/source_blog/source_blog.entity";

export const DatabaseOrm = TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'indev_staging',
    entities: [SourceBlogEntity],
    synchronize: true,
    logging : true
})