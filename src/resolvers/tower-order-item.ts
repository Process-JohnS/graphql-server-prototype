
import { Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TowerOrderItem } from './../entity/tower-order-item';


@Resolver(of => TowerOrderItem)
class TowerOrderItemResolver {

  @InjectRepository(TowerOrderItem)
  private readonly orderRepository: Repository<TowerOrderItem>;

}
