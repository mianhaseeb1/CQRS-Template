import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Get('health')
  health(): void {
    return;
  }

  @Get()
  getRoot() {
    return { message: 'Welcome to the API', version: 'v1' };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Get('favicon.io')
  favicon(): void {
    return;
  }
}
