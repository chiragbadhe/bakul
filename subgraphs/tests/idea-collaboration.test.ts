import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { CollaboratorAccepted } from "../generated/schema";
import { CollaboratorAccepted as CollaboratorAcceptedEvent } from "../generated/idea-collaboration/idea-collaboration";
import { handleCollaboratorAccepted } from "../src/idea-collaboration";
import { createCollaboratorAcceptedEvent } from "./idea-collaboration-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let ideaId = BigInt.fromI32(234);
    let user = Address.fromString("0x0000000000000000000000000000000000000001");
    let newCollaboratorAcceptedEvent = createCollaboratorAcceptedEvent(
      ideaId,
      user
    );
    handleCollaboratorAccepted(newCollaboratorAcceptedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CollaboratorAccepted created and stored", () => {
    assert.entityCount("CollaboratorAccepted", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CollaboratorAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ideaId",
      "234"
    );
    assert.fieldEquals(
      "CollaboratorAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
