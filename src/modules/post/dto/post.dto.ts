import { IsString, IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;
}

export default PostDto;
