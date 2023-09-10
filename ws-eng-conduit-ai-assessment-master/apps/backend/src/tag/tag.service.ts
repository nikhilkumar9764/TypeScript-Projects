import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll();
    console.log(tags);
    return { tags: tags.map((tag) => tag.tag) };
  }


  async create(tagDto: CreateTagDto): Promise<Tag> {
    const tag = new Tag();
    tag.tag = tagDto.name;
    return await this.tagRepository.create(tag);
    
  }


  async findById(id: number): Promise<Tag | null> {
    return await this.tagRepository.findOne(id);
  }

  
  async delete(id: number): Promise<void> {
    await this.tagRepository.nativeDelete(id);
  }
}
