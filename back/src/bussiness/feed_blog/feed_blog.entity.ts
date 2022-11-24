import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}