import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {BlogEntity} from "../blog/blog.entity";
import {FeedBlogEntity} from "../feed_blog/feed_blog.entity";

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

    @OneToOne(()=>FeedBlogEntity)
    feedBlog : FeedBlogEntity
}