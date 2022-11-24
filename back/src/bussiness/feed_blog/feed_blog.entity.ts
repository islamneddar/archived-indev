import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {SourceBlogEntity} from "../source_blog/source_blog.entity";

@Entity({
    name : "feed_blogs"
})
export class FeedBlogEntity {
    @PrimaryGeneratedColumn({
        name : "feed_blog_id"
    })
    feedBlogId : number;

    @Column({unique : true, nullable : false})
    title : string

    @DeleteDateColumn({name: "delete_date"})
    deleteDate: Date

    @CreateDateColumn({name : "creation_at"})
    creationDate: Date

    @UpdateDateColumn({name : "update_at"})
    updateDate : Date

    @OneToOne(()=>SourceBlogEntity)
    @JoinColumn({name : "source_blog_id"})
    sourceBlog : SourceBlogEntity
}