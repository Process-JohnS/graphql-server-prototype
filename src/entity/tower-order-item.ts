
import { Entity, Column, PrimaryColumn, ManyToOne, BeforeInsert, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { nanoid } from 'nanoid';
import { TowerOrder } from './tower-order';


@InputType('TowerOrderItemInput')
@ObjectType()
@Entity()
export class TowerOrderItem extends BaseEntity {

  @Field(type => ID, { nullable: true })
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  sku: string;

  @Field()
  @Column()
  quantityOrdered: number;

  @Field()
  @Column({ type: 'bigint' })
  price: number;

  @Field()
  @Column({ type: 'bigint' })
  discountAmount: number;

  @Field()
  @Column({ type: 'bigint' })
  rowTotalInclTax: number;

  @ManyToOne(() => TowerOrder, order => order.items, { onDelete: 'CASCADE' })
  order: TowerOrder;

  @BeforeInsert()
  addId() {
    this.id = nanoid();
  }
}
