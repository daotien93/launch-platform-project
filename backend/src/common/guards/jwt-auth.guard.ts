import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that protects routes by checking for a valid JWT token.
 * It extends the built-in Passport AuthGuard with the 'jwt' strategy.
 * Usage: @UseGuards(JwtAuthGuard) on controllers or route handlers.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
