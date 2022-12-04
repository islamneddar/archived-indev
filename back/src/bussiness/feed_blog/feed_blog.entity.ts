import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, OneToMany,
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

    // rss feed url
    @Column({unique : true, nullable : false, name : "url_feed"})
    urlFeed : string

    @DeleteDateColumn({name: "delete_date"})
    deleteDate: Date

    @CreateDateColumn({name : "creation_at"})
    creationDate: Date

    @UpdateDateColumn({name : "update_at"})
    updateDate : Date

    @OneToMany(()=>SourceBlogEntity,(sourceBlog) => sourceBlog.feedBlog)
    sourceBlogs : SourceBlogEntity[]
}