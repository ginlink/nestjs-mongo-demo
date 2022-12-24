import { Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { BaseSchema } from './base.schema';
import { buildSchema } from '@typegoose/typegoose';

export class Post extends BaseSchema {
  @Prop()
  title: string;

  @Exclude()
  @Prop()
  content: string;
}

Post.SCHEMA = buildSchema(Post);
