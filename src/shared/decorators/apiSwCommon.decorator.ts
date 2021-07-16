import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseApiErrorResponse } from '../dtos/base-api-response.dto';

export function ApiSwCommon(summary, responseDto) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({ status: HttpStatus.OK, type: responseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseApiErrorResponse }),
  );
}
