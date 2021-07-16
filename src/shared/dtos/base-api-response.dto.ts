import { ApiProperty } from '@nestjs/swagger';

export class BaseApiResponse<T> {
  public data: T;

  public meta: any;
}

export function SwaggerBaseApiResponse<T>(type: T): typeof BaseApiResponse {
  class ExtendedBaseApiResponse<T> extends BaseApiResponse<T> {
    @ApiProperty({ type })
    public data: T;
  }

  return ExtendedBaseApiResponse;
}

export class BaseApiErrorObject {
  public statusCode: number;

  public message: string;

  public localizedMessage: string;

  public errorName: string;

  public details: unknown;

  public path: string;

  public requestId: string;

  public timestamp: string;
}

export class BaseApiErrorResponse {
  public error: BaseApiErrorObject;
}
