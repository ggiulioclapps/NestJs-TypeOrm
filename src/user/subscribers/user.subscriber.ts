import { hash } from 'bcrypt';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { TransactionCommitEvent } from 'typeorm/subscriber/event/TransactionCommitEvent';
import { TransactionRollbackEvent } from 'typeorm/subscriber/event/TransactionRollbackEvent';
import { TransactionStartEvent } from 'typeorm/subscriber/event/TransactionStartEvent';

import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {

  /**
   * Called after entity is loaded.
   */
  // afterLoad(entity: User) {
  //   console.log(`AFTER ENTITY LOADED: `, entity);
  // }

  /**
   * Called before post insertion.
   */
  async beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE POST INSERTED`);
    if (event.entity.password) {
      event.entity.password = await hash(event.entity.password, 10);
    }
  }

  /**
   * Called after entity insertion.
   */
  // afterInsert(event: InsertEvent<User>) {
  //   console.log(`AFTER ENTITY INSERTED: `, event.entity);
  // }

  /**
   * Called before entity update.
   */
  async beforeUpdate(event: UpdateEvent<User>) {
    console.log(`BEFORE ENTITY UPDATED`);
    if (event.entity.password) {
      event.entity.password = await hash(event.entity.password, 10);
    }
  }

  /**
   * Called after entity update.
   */
  // afterUpdate(event: UpdateEvent<User>) {
  //   console.log(`AFTER ENTITY UPDATED: `, event.entity);
  // }

  /**
   * Called before entity removal.
   */
  // beforeRemove(event: RemoveEvent<User>) {
  //   console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  // }

  /**
   * Called after entity removal.
   */
  // afterRemove(event: RemoveEvent<User>) {
  //   console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  // }

  /**
   * Called before transaction start.
   */
  // beforeTransactionStart(event: TransactionStartEvent) {
  //   console.log(`BEFORE TRANSACTION STARTED: `, event);
  // }

  /**
   * Called after transaction start.
   */
  // afterTransactionStart(event: TransactionStartEvent) {
  //   console.log(`AFTER TRANSACTION STARTED: `, event);
  // }

  /**
   * Called before transaction commit.
   */
  // beforeTransactionCommit(event: TransactionCommitEvent) {
  //   console.log(`BEFORE TRANSACTION COMMITTED: `, event);
  // }

  /**
   * Called after transaction commit.
   */
  // afterTransactionCommit(event: TransactionCommitEvent) {
  //   console.log(`AFTER TRANSACTION COMMITTED: `, event);
  // }

  /**
   * Called before transaction rollback.
   */
  // beforeTransactionRollback(event: TransactionRollbackEvent) {
  //   console.log(`BEFORE TRANSACTION ROLLBACK: `, event);
  // }

  /**
   * Called after transaction rollback.
   */
  // afterTransactionRollback(event: TransactionRollbackEvent) {
  //   console.log(`AFTER TRANSACTION ROLLBACK: `, event);
  // }

}
