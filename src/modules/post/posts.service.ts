import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '@/schemas/post.schema';
import { NotFoundException } from '@nestjs/common/exceptions';
import PostDto from './dto/post.dto';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: ReturnModelType<typeof Post>,
  ) {}

  async findAll() {
    return this.postModel.find();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  create(postData: PostDto) {
    const createdPost = new this.postModel(postData);
    return createdPost.save();
  }

  async update(id: string, postData: PostDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string) {
    const result = await this.postModel.findByIdAndDelete(postId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

export default PostsService;
