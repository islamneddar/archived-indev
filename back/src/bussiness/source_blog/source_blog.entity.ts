import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('source_blogs', {
    synchronize : true
})
export class SourceBlogEntity {
    @PrimaryGeneratedColumn({name : "source_blog_id"})
    sourceBlogId : number

    @Column({
        unique : true
    })
    name : string

    @Column()
    image : string;
}