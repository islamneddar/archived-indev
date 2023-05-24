import {IsBoolean, IsNumber} from 'class-validator';

export class FollowSourceBlogRequest {
  @IsNumber()
  sourceBlogId: number;

  @IsBoolean()
  isFollow: boolean;
}
