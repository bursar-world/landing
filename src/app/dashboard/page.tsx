import { redirect } from 'next/navigation';

import { CONSOLE_HREF } from '../_content';

/** The Lovable site kept its workspace at /dashboard; old links and bookmarks land in the console. */
export default function DashboardRedirect() {
  redirect(CONSOLE_HREF);
}
