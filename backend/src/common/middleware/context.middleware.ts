import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

export interface RequestWithUser extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = this.jwtService.verify<{ sub: string; email: string }>(
          token,
        );
        (req as RequestWithUser).user = {
          userId: payload.sub,
          email: payload.email,
        };
      } catch {
        // Token invalid or expired — continue without user context
      }
    }

    next();
  }
}
