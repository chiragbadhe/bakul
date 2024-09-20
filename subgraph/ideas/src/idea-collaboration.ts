import {
  CollaboratorAccepted as CollaboratorAcceptedEvent,
  CollaboratorRejected as CollaboratorRejectedEvent,
  IdeaSubmitted as IdeaSubmittedEvent,
  InterestExpressed as InterestExpressedEvent,
  Voted as VotedEvent
} from "../generated/idea-collaboration/idea-collaboration"
import {
  CollaboratorAccepted,
  CollaboratorRejected,
  IdeaSubmitted,
  InterestExpressed,
  Voted
} from "../generated/schema"

export function handleCollaboratorAccepted(
  event: CollaboratorAcceptedEvent
): void {
  let entity = new CollaboratorAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ideaId = event.params.ideaId
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCollaboratorRejected(
  event: CollaboratorRejectedEvent
): void {
  let entity = new CollaboratorRejected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ideaId = event.params.ideaId
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIdeaSubmitted(event: IdeaSubmittedEvent): void {
  let entity = new IdeaSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ideaId = event.params.ideaId
  entity.publisher = event.params.publisher

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInterestExpressed(event: InterestExpressedEvent): void {
  let entity = new InterestExpressed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ideaId = event.params.ideaId
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ideaId = event.params.ideaId
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
