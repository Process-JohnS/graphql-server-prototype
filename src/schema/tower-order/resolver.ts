

import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TowerOrder } from './entity';
import { TowerOrderItem } from '../tower-order-item/entity';


@Resolver(of => TowerOrder)
export class TowerOrderResolver {

  @InjectRepository(TowerOrder)
  private readonly orderRepository: Repository<TowerOrder>;

  @Query(returns => [TowerOrder])
  async orders() {
    return TowerOrder.find();
  }

  @Mutation(returns => TowerOrder)
  async createOrder(@Arg('input') input: TowerOrder) {
    let newOrder = input as TowerOrder;
    let savedOrder = await newOrder.save();
    return savedOrder;
  }

  @Mutation(returns => [TowerOrder])
  async deleteAllOrders() {
    let savedOrders = await this.orderRepository.find();
    savedOrders.forEach(o => o.remove());
    return savedOrders;
  }


  /* Set Synchronization */

  @Mutation(returns => [TowerOrder])
  async syncAllOrders(): Promise<TowerOrder[]> {
    let syncedOrders: TowerOrder[] = [];
    let unsyncedOrders = await this.orderRepository.find({ isSynced: false });
    for (let unsynced of unsyncedOrders) {
      syncedOrders.push(await Object.assign(unsynced, { isSynced: true }).save());
    }
    return syncedOrders;
  }

  @Mutation(returns => [TowerOrder])
  async unsyncAllOrders(): Promise<TowerOrder[]> {
    let unsyncedOrders: TowerOrder[] = [];
    let syncedOrders = await this.orderRepository.find({ isSynced: true });
    for (let synced of syncedOrders) {
      unsyncedOrders.push(await Object.assign(synced, { isSynced: false }).save());
    }
    return unsyncedOrders;
  }

  @FieldResolver()
  items(@Root() order: TowerOrder): TowerOrderItem[] | undefined {
    return order.items;
  }

}
