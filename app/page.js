'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [showToast, setShowToast] = useState(false)
  const [activeFAQ, setActiveFAQ] = useState(null)

  // Rotating social proof toast
  useEffect(() => {
    const interval = setInterval(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const faqs = [
    { q: "Is it really free to start?", a: "Yes. Free plan includes up to 5 clients and 10 invoices per month. No credit card required." },
    { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no hidden fees. Cancel from your dashboard in one click." },
    { q: "What payment methods do you support?", a: "Stripe, PayPal, and bank transfers. More coming soon." },
    { q: "Is my data secure?", a: "End-to-end encryption, Supabase RLS policies, and regular security audits." }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent)]">
      
      {/* Live Social Proof Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3 shadow-2xl">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">JD</div>
            <div>
              <p className="text-white text-sm">João just signed up from Brazil</p>
              <p className="text-gray-400 text-xs">Join 5,000+ freelancers</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">FP</span>
              </div>
              <span className="font-semibold text-white">Freelance Portal</span>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition">
                Login
              </Link>
              <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto py-20">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Manage your freelance business
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> professionally</span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Invoices. Clients. Payments. Everything you need to run your freelance business, all in one place.
          </p>
          
          {/* Trust Badges */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              <span>Bank-level Security</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              Start Free Today
            </Link>
            <Link href="/login" className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition">
              Sign In
            </Link>
          </div>
        </div>

        {/* Animated Stats Bar */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="animate-in fade-in duration-1000">
              <div className="text-3xl font-bold text-white">5,000+</div>
              <div className="text-gray-400 text-sm">Active Freelancers</div>
            </div>
            <div className="animate-in fade-in duration-1000 delay-100">
              <div className="text-3xl font-bold text-white">25,000+</div>
              <div className="text-gray-400 text-sm">Invoices Sent</div>
            </div>
            <div className="animate-in fade-in duration-1000 delay-200">
              <div className="text-3xl font-bold text-white">$2.5M+</div>
              <div className="text-gray-400 text-sm">Revenue Tracked</div>
            </div>
            <div className="animate-in fade-in duration-1000 delay-300">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Product Preview - Dashboard Mockup */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-30"></div>
          <div className="relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-3 shadow-2xl">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm">Dashboard Preview</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Total Clients</div>
                  <div className="text-white text-2xl font-bold">12</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Active Invoices</div>
                  <div className="text-white text-2xl font-bold">8</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Revenue (MTD)</div>
                  <div className="text-white text-2xl font-bold">$4,200</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Loved by freelancers worldwide</h2>
            <p className="text-gray-400">Don't just take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_,j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4">"This platform completely changed how I manage my freelance business. Invoice tracking alone saved me 5 hours per week."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {i === 1 ? 'JD' : i === 2 ? 'MK' : 'SR'}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {i === 1 ? 'João Silva' : i === 2 ? 'Maria K.' : 'Sarah R.'}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {i === 1 ? 'UI Designer' : i === 2 ? 'Full-Stack Dev' : 'Content Creator'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Start free. Upgrade when you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="text-3xl font-bold text-white mb-4">$0<span className="text-gray-400 text-base font-normal">/month</span></div>
              <ul className="space-y-2 mb-6">
                <li className="text-gray-300 text-sm">✓ Up to 5 clients</li>
                <li className="text-gray-300 text-sm">✓ Up to 10 invoices/month</li>
                <li className="text-gray-300 text-sm">✓ Basic invoice templates</li>
                <li className="text-gray-300 text-sm">✓ Email support</li>
              </ul>
              <Link href="/signup" className="block text-center bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition">
                Start Free
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="absolute -mt-12 px-3 py-1 bg-purple-600 rounded-full text-xs text-white font-semibold">Popular</div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-3xl font-bold text-white mb-4">$19<span className="text-gray-400 text-base font-normal">/month</span></div>
              <ul className="space-y-2 mb-6">
                <li className="text-gray-300 text-sm">✓ Unlimited clients</li>
                <li className="text-gray-300 text-sm">✓ Unlimited invoices</li>
                <li className="text-gray-300 text-sm">✓ AI invoice explainer</li>
                <li className="text-gray-300 text-sm">✓ Priority support</li>
                <li className="text-gray-300 text-sm">✓ Custom branding</li>
              </ul>
              <Link href="/signup" className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition">
                Start Pro Trial
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently asked questions</h2>
            <p className="text-gray-400">Everything you need to know</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${activeFAQ === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFAQ === idx && (
                  <div className="px-6 pb-4 text-gray-300 text-sm border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-4">Ready to get paid like a pro?</h2>
            <p className="text-gray-300 mb-6">Join 5,000+ freelancers who trust us with their business</p>
            <div className="flex justify-center gap-8 mb-6 text-gray-400 text-xs">
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 14-day money back</span>
            </div>
            <Link href="/signup" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              Start Free Today
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-10 text-center text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Contact</Link>
            <Link href="#" className="hover:text-white transition">Security</Link>
          </div>
          <p>© 2026 Freelance Portal. All rights reserved. Built in public with Next.js + Supabase.</p>
        </div>
      </footer>
    </div>
  )
}