import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <h2 className="mt-4 text-3xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link to="/Login">
          <Button className="mt-6">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound