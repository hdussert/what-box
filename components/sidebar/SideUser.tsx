import { getCurrentUser } from '@/lib/user'

/** The signed-in user's email, for the sidebar header. */
const SideUser = async () => {
  const user = await getCurrentUser()

  return (
    <p
      className="truncate px-1 text-xs text-muted-foreground"
      title={user.email}
    >
      {user.email}
    </p>
  )
}

export default SideUser
