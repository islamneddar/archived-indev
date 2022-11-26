import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {BlogEntity} from "../blog/blog.entity";

@Entity({
    name : "tags"
})
export class TagEntity{
    @PrimaryGeneratedColumn({
        name : "tag_id"
    })
    tagId : number;

    @Column({unique : true, nullable : false})
    title : string

    @ManyToMany(()=> BlogEntity, (blog) => blog.tags)
    blogs : BlogEntity[]
}