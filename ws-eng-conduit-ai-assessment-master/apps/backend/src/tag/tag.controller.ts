import { Body, Controller, Get , Param, Post , Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ITagsRO } from './tag.interface';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/tag.dto';
import { Tag } from './tag.entity';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<ITagsRO> {
    return this.tagService.findAll();
  }

  @Post()
  async create(@Body() tagDto: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(tagDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Tag| null> {
      return await this.tagService.findById(id);
  }


  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.tagService.delete(id);
  }

  @Post('bulk')
  async createBulk(@Body() tagNames: string[]): Promise<Tag[]> {
    const createdTags: Tag[] = [];
    
    for (const name of tagNames) {
      const tagDto: CreateTagDto = { name };
      const createdTag = await this.tagService.create(tagDto);
      createdTags.push(createdTag);
    }

    return createdTags;
  }
}
