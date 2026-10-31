import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";
import Image from "next/image";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { Edit } from "lucide-react";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";


export default async function Home() {
  await connectDB();
  const session = await auth();
  const user = await userModel.findById(session?.user?.id);
  if (!user) {
    redirect("/login")
  }

  const inComplete = !user.role || !user.mobile || (user.role == "user" && !user.mobile);

  if(inComplete) {
    return <EditRoleMobile />
  }

  const PlainUser = JSON.parse(JSON.stringify(user));



  return (
    <div>
      <Nav user={PlainUser}/>
    </div>
  );
}
