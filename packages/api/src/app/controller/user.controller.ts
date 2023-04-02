import { Body, Controller, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Get, Post } from '../../base/decorator/request-method.decorator';
import { StatusCode } from '../../base/error/api-errors';
import { ErrorDetails } from '../../base/error/error-details';
import { createControllerModule } from '../../base/util/controller-module.factory';
import {
  UserNotFoundError,
  UserService,
} from '../../domain/user/user.interface';
import { UserModule } from '../../domain/user/user.module';

export class CreateUserRequest {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  avatar: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserResponse {
  @ApiProperty()
  @IsString()
  id: string;
}

export class GetUserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  avatar: string;
  @ApiPropertyOptional({ nullable: true })
  deletedAt?: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  rememberMe: boolean;
}

@ApiTags('user')
@ApiBearerAuth()
@Controller()
class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: CreateUserResponse })
  @Post('v1/user')
  async createUser(
    @Body() req: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const user = await this.userService.create(req);
    return { id: user.id };
  }

  @ApiOkResponse({ type: GetUserResponse })
  @ApiNotFoundResponse()
  @Get('v1/user/:id')
  async getUser(@Param('id') id: string): Promise<GetUserResponse> {
    try {
      return await this.userService.findOneOrThrow(id);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw ErrorDetails.from(StatusCode.NOT_FOUND, e.message)
          .error(e)
          .toHttpException();
      }
      throw e;
    }
  }
}

export const UserControllerModule = createControllerModule(UserController, [
  UserModule,
]);
