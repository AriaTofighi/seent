import { Test, TestingModule } from "@nestjs/testing";
import { RoomUsersController } from "./room-users.controller";
import { RoomUsersService } from "./room-users.service";

describe("RoomUsersController", () => {
  let controller: RoomUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomUsersController],
      providers: [RoomUsersService],
    }).compile();

    controller = module.get<RoomUsersController>(RoomUsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
