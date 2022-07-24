import { Test, TestingModule } from '@nestjs/testing';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';

describe('ReactionsController', () => {
  let controller: ReactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReactionsController],
      providers: [ReactionsService],
    }).compile();

    controller = module.get<ReactionsController>(ReactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
