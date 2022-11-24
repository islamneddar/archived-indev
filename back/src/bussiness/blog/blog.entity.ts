import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {SourceBlogEntity} from "../source_blog/source_blog.entity";
import {JoinColumn} from "typeorm";

@Entity({name : 'blogs'})
export class BlogEntity {
    @PrimaryGeneratedColumn({name : "blog_id"})
    blogId : number

    @Column({unique : true})
    title : string

    @Column()
    thumbnail : string

    @Column()
    permalink : string

    @ManyToOne(()=>SourceBlogEntity, (sourceBlog) => sourceBlog.blogs)
    @JoinColumn({name : "source_blog_id"})
    sourceBlog : SourceBlogEntity

    @DeleteDateColumn({name: "delete_date"})
    deleteDate: Date

    @CreateDateColumn({name : "creation_at"})
    creationDate: Date

    @UpdateDateColumn({name : "update_at"})
    updateDate : Date

    @Column({name : "publish_date"})
    publishDate : Date
}
