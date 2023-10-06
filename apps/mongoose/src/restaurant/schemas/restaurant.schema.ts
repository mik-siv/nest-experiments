import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, required: true })
    restaurant_id: string;
    @Prop({ type: Object, required: true })
    address: object;
    @Prop({ type: String, required: true })
    borough: string;
    @Prop({ type: String, required: true })
    cuisine: string;
    @Prop({ type: Object, required: true })
    grades: object[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
