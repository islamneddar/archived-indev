import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('source_blogs')
export class SourceBlogEntity {
    @PrimaryGeneratedColumn()
    @Column({name : 'source_blog_id'})
    sourceBlogId : number

    @Column({
        unique : true
    })
    name : string

    @Column()
    image : string;
}