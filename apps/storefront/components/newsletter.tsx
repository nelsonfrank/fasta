"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Zap, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-semibold">Get Early Access</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-balance">
              Be the first to know about new products & exclusive deals.
            </h2>
            <p className="mt-4 text-background/70">
              Join 50,000+ tech enthusiasts who get insider updates and up to 20% off their first order.
            </p>
          </div>

          <div className="w-full max-w-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/50"
                  required
                />
                <Button
                  type="submit"
                  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/20">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-background">You're in!</p>
                  <p className="text-sm text-background/70">Check your email for a welcome surprise.</p>
                </div>
              </div>
            )}
            <p className="mt-3 text-xs text-background/50">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
