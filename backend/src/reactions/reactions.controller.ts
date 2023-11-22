import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from 'src/users/entity/user.entity';
import { User } from 'src/users/utils/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreateReactionDto, ReactionInfoResponseDto } from './dto/reaction.dto';
import { ReactionsService } from './reactions.service';

@ApiTags('Reaction API')
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Get('/:diaryId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '리액션 조회 API' })
  @ApiOkResponse({ description: '리액션 조회 성공' })
  async getReactions(
    @User() user: UserEntity,
    @Param('diaryId', ParseIntPipe) diaryId: number,
  ): Promise<Record<string, ReactionInfoResponseDto[]>> {
    const reactions = await this.reactionsService.getReaction(user, diaryId);

    const reactionList = reactions.map<ReactionInfoResponseDto>((reaction) => {
      return {
        userId: reaction.user.id,
        nickname: reaction.user.nickname,
        profileImage: reaction.user.profileImage,
        reaction: reaction.reaction,
      };
    });
    return { reactionList };
  }

  @Post('/:diaryId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiOperation({ description: '리액션 저장 API' })
  @ApiCreatedResponse({ description: '리액션 저장 성공' })
  async createReaction(
    @User() user: UserEntity,
    @Param('diaryId', ParseIntPipe) diaryId: number,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    await this.reactionsService.saveReaction(user, diaryId, createReactionDto);

    return '일기에 반응을 남겼습니다.';
  }
}