import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CollaboratorAccepted,
  CollaboratorRejected,
  IdeaSubmitted,
  InterestExpressed,
  Voted
} from "../generated/idea-collaboration/idea-collaboration"

export function createCollaboratorAcceptedEvent(
  ideaId: BigInt,
  user: Address
): CollaboratorAccepted {
  let collaboratorAcceptedEvent = changetype<CollaboratorAccepted>(
    newMockEvent()
  )

  collaboratorAcceptedEvent.parameters = new Array()

  collaboratorAcceptedEvent.parameters.push(
    new ethereum.EventParam("ideaId", ethereum.Value.fromUnsignedBigInt(ideaId))
  )
  collaboratorAcceptedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return collaboratorAcceptedEvent
}

export function createCollaboratorRejectedEvent(
  ideaId: BigInt,
  user: Address
): CollaboratorRejected {
  let collaboratorRejectedEvent = changetype<CollaboratorRejected>(
    newMockEvent()
  )

  collaboratorRejectedEvent.parameters = new Array()

  collaboratorRejectedEvent.parameters.push(
    new ethereum.EventParam("ideaId", ethereum.Value.fromUnsignedBigInt(ideaId))
  )
  collaboratorRejectedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return collaboratorRejectedEvent
}

export function createIdeaSubmittedEvent(
  ideaId: BigInt,
  publisher: Address
): IdeaSubmitted {
  let ideaSubmittedEvent = changetype<IdeaSubmitted>(newMockEvent())

  ideaSubmittedEvent.parameters = new Array()

  ideaSubmittedEvent.parameters.push(
    new ethereum.EventParam("ideaId", ethereum.Value.fromUnsignedBigInt(ideaId))
  )
  ideaSubmittedEvent.parameters.push(
    new ethereum.EventParam("publisher", ethereum.Value.fromAddress(publisher))
  )

  return ideaSubmittedEvent
}

export function createInterestExpressedEvent(
  ideaId: BigInt,
  user: Address
): InterestExpressed {
  let interestExpressedEvent = changetype<InterestExpressed>(newMockEvent())

  interestExpressedEvent.parameters = new Array()

  interestExpressedEvent.parameters.push(
    new ethereum.EventParam("ideaId", ethereum.Value.fromUnsignedBigInt(ideaId))
  )
  interestExpressedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return interestExpressedEvent
}

export function createVotedEvent(ideaId: BigInt, voter: Address): Voted {
  let votedEvent = changetype<Voted>(newMockEvent())

  votedEvent.parameters = new Array()

  votedEvent.parameters.push(
    new ethereum.EventParam("ideaId", ethereum.Value.fromUnsignedBigInt(ideaId))
  )
  votedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return votedEvent
}
