
import { Entity, Column, PrimaryColumn, BeforeInsert, OneToMany, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, Int, InputType } from 'type-graphql';
import { nanoid } from 'nanoid';
import { TowerOrderItem } from './tower-order-item';


export enum SaleType {
  S = 'S'
};

registerEnumType(SaleType, {
  name: 'SaleType',
});


@InputType('TowerOrderInput')
@ObjectType()
@Entity()
export class TowerOrder extends BaseEntity {

  @Field(type => ID, { nullable: true })
  @PrimaryColumn()
  id?: string;

  @Field(type => Int)
  @Column()
  orderId: number;

  @Field(type => Int)
  @Column()
  customerId: number;

  @Field()
  @Column()
  customerEmail: string;

  @Field()
  @Column()
  customerFirstName: string;

  @Field()
  @Column()
  customerLastName: string;

  @Field()
  @Column()
  currency: string;

  @Field()
  @Column({ type: 'bigint' })
  grandTotal: number;

  @Field(type => SaleType, { nullable: true })
  @Column({
    type: 'enum',
    enum: SaleType,
    default: SaleType.S
  })
  saleType: SaleType;

  @Field()
  @Column({ type: 'bigint' })
  shippingAmount: number;

  @Field({ nullable: true })
  @Column({ default: false })
  isSynced: boolean;

  @Field(type => [TowerOrderItem], { nullable: true })
  @OneToMany(() => TowerOrderItem, orderItem => orderItem.order, {
    cascade: true,
    eager: true,
  })
  items?: TowerOrderItem[];

  @BeforeInsert()
  addId() {
    this.id = nanoid();
  }
}
