import Loader from "@/components/Loader";
import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
    return (
		<Suspense fallback={<Loader />}>
      		<LoginForm />
    	</Suspense>
    )
}
