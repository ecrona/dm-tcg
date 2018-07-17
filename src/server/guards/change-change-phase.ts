import { Guard, CanActivate, ExecutionContext } from '@nestjs/common'

@Guard()
export class CanChangePhaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(context)
    return true
  }
}
