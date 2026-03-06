import { redirect } from "next/navigation";

export default function ManagerLoginPage() {
  redirect("/login?portal=manager");
}
