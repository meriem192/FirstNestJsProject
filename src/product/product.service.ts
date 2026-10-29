import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...createProductDto
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return {status: 200,message : 'Product retrieved successfully', data: product};
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...this.products[productIndex], ...updateProductDto };
    this.products[productIndex] = updatedProduct;
    return {status: 200,message : 'Product updated successfully', data: updatedProduct};
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const removedProduct = this.products.splice(productIndex, 1)[0];
    return {status: 200,message : 'Product removed successfully', data: removedProduct};
  }
}
