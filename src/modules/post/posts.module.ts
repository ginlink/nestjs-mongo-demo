import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { Post } from 'src/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: Post.SCHEMA }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
class PostsModule {}

export default PostsModule;
