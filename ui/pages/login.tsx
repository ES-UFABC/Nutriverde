import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  async function submit(e: any) {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },        
    };
      const path = "register";
      const res = await fetch(`http://localhost:3000/${path}`, requestOptions);
      const resJson = await res.json();
      
    
  }
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}