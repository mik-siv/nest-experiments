import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,
  ) { }

  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantDocument> {
    try {
      const createdRestaurant = new this.restaurantModel(createRestaurantDto);
      return await createdRestaurant.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<RestaurantDocument[]> {
    const restaurants = await this.restaurantModel.find().limit(10).exec();
    if (!restaurants) throw new NotFoundException('No restaurants found');
    return restaurants;
  }

  async findOne(id: string): Promise<RestaurantDocument> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) throw new NotFoundException('No restaurant found');
    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<RestaurantDocument> {
    try {
      const restaurant = await this.findOne(id);
      if (!restaurant) throw new NotFoundException('No restaurant found');
      restaurant.set(updateRestaurantDto);
      return await restaurant.save();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const restaurant = await this.findOne(id);
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
      await restaurant.deleteOne();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new BadRequestException(err.message);
    }
  }
}
