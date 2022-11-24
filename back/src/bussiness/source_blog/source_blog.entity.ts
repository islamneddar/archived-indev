import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {BlogEntity} from "../blog/blog.entity";
import {blob} from "stream/consumers";

@Entity('source_blogs', {
    synchronize: true
})
export class SourceBlogEntity {
    @PrimaryGeneratedColumn({name: "source_blog_id"})
    sourceBlogId: number

    @Column({
        unique: true
    })
    name: string

    @Column()
    image: string;

    @DeleteDateColumn({name: "delete_date"})
    deleteDate: Date

    @CreateDateColumn({name : "creation_at"})
    creationDate: Date

    @UpdateDateColumn({name : "update_at"})
    updateDate : Date

    @OneToMany(()=>BlogEntity, (blog) => blog.sourceBlog)
    blogs : BlogEntity[]
}