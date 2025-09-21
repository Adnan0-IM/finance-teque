import { Link, } from "react-router";
import { Button } from "./ui/button";

export default function NotFoundPage() {
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <Link to="/">
        <Button className="text-lg text-black hover:bg-brand-primary" variant="ghost" >Go Home</Button>
      </Link>
    </div>
  );
}
