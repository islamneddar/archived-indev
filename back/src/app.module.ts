import {Module} from '@nestjs/common';
import { DatabaseOrm } from './database/db.config';
import { SourceBlogModule } from './bussiness/source_blog/source_blog.module';

@Module({
    imports: [DatabaseOrm, SourceBlogModule],
    controllers: [],
    providers: []
})
export class AppModule {
}
