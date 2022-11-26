import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Get app root end-point' })
  @ApiResponse({ status: 200, description: 'Returns greetings' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
