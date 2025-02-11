import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware'
import { NextRequest } from 'next/server'

export default withAuth(
  async (req: NextRequest) => {
    // console.log(req)
  },
  {
    isReturnToCurrentPage: true,
  }
)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|images|$).*)'],
}

