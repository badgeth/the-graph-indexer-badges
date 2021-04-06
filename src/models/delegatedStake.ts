import { ethereum, log } from "@graphprotocol/graph-ts";
import {
  DelegatedStake as DelegatedStakeEntity,
  Delegator as DelegatorEntity,
  Indexer as IndexerEntity,
} from "../../generated/schema";

// A class to manage DelegatedStake
export class DelegatedStake {
  delegatedStakeEntity: DelegatedStakeEntity;
  delegatorEntity: DelegatorEntity;
  indexerEntity: IndexerEntity;
  currentBlock: ethereum.Block;

  constructor(
    indexerEntity: IndexerEntity,
    delegatorEntity: DelegatorEntity,
    currentBlock: ethereum.Block
  ) {
    this.currentBlock = currentBlock;
    this.indexerEntity = indexerEntity;
    this.delegatorEntity = delegatorEntity;
    this.delegatedStakeEntity = this._initializeDelegatedStakeEntity();
  }

  _initializeDelegatedStakeEntity(): DelegatedStakeEntity {
    let delegatedStakeEntity = DelegatedStakeEntity.load(this.id);
    if (delegatedStakeEntity == null) {
      delegatedStakeEntity = new DelegatedStakeEntity(this.id);
      delegatedStakeEntity.indexer = this.indexerEntity.id;
      delegatedStakeEntity.delegator = this.delegatorEntity.id;
      delegatedStakeEntity.createdAtTimestamp = this.currentBlock.timestamp;
      delegatedStakeEntity.save();
    }

    return delegatedStakeEntity as DelegatedStakeEntity;
  }

  //--- GETTERS ---//
  get id(): string {
    log.info("WACKY!!!!!!!!!!!!!!!!!!!!!!!!!1", []);
    log.info("this.indexerEntity.id {}", [this.indexerEntity.id.toString()]);
    log.info("this.delegatorEntity.id {}", [
      this.delegatorEntity.id.toString(),
    ]);
    return this.indexerEntity.id
      .toString()
      .concat("-")
      .concat(this.delegatorEntity.id.toString());
  }

  get isCreatedThisBlock(): boolean {
    return (
      this.delegatedStakeEntity.createdAtTimestamp ==
      this.currentBlock.timestamp
    );
  }
}
