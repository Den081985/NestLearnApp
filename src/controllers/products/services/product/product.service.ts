import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../dto/create-product.dto';
import { Product } from '../../product.entity';

@Injectable()
export class ProductService {
  private products = [];

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(productDto);
    return this.productRepository.save(newProduct);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
