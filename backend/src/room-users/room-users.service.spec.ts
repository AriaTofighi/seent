import { Test, TestingModule } from "@nestjs/testing";
import { RoomUsersService } from "./room-users.service";

describe("RoomUsersService", () => {
  let service: RoomUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomUsersService],
    }).compile();

    service = module.get<RoomUsersService>(RoomUsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
