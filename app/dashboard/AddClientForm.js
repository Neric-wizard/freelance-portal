'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export default function AddClientForm({ onClientAdded }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [initials, setInitials] = useState('')
  
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)

  useEffect(() => {
    if (isExpanded && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isExpanded])

  const validateField = (field, value) => {
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !emailRegex.test(value)) {
        setFieldErrors(prev => ({ ...prev, email: 'Invalid email format' }))
        return false
      } else {
        setFieldErrors(prev => ({ ...prev, email: '' }))
        return true
      }
    }
    if (field === 'name') {
      if (value && value.length < 2) {
        setFieldErrors(prev => ({ ...prev, name: 'Name must be at least 2 characters' }))
        return false
      } else {
        setFieldErrors(prev => ({ ...prev, name: '' }))
        return true
      }
    }
    return true
  }

  useEffect(() => {
    if (name) {
      const parts = name.split(' ')
      const init = parts.map(p => p[0]).join('').toUpperCase().slice(0, 2)
      setInitials(init)
    } else {
      setInitials('')
    }
  }, [name])

  const handleNameChange = (e) => {
    setName(e.target.value)
    validateField('name', e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    validateField('email', e.target.value)
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && isExpanded) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const isNameValid = validateField('name', name)
    const isEmailValid = validateField('email', email)
    
    if (!isNameValid || !isEmailValid) {
      toast.error('Please fix validation errors')
      return
    }
    
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError('You must be logged in')
      setLoading(false)
      return
    }

    if (onClientAdded) onClientAdded()

    const { error: insertError } = await supabase
      .from('clients')
      .insert([
        { name, email, company, user_id: user.id }
      ])

    if (insertError) {
      setError(insertError.message)
      toast.error('Failed to add client')
    } else {
      setSuccess(true)
      toast.success('Client added successfully!')
      setName('')
      setEmail('')
      setCompany('')
      setInitials('')
      setIsExpanded(false)
      if (onClientAdded) onClientAdded()
      
      setTimeout(() => setSuccess(false), 2000)
    }
    setLoading(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden mb-8 shadow-lg"
    >
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:border-purple-500/50 transition group-hover:shadow-lg">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg tracking-tight">Add New Client</h3>
            <p className="text-gray-500 text-xs">Create a new client profile</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          className="text-gray-400 group-hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Expandable Form */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-white/10">
              
              {/* Premium Success Animation */}
              {success && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-200 p-3 rounded-xl text-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Client added successfully!
                </motion.div>
              )}

              {/* Premium Error Message */}
              {error && (
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="mb-4 bg-red-500/20 border border-red-500/30 text-red-200 p-3 rounded-xl text-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5">
                
                {/* Name Field with Avatar Preview */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Client Name <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input
                          ref={nameInputRef}
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all ${fieldErrors.name ? 'border-red-500/50' : 'border-white/10'}`}
                          placeholder="John Doe"
                          autoFocus={isExpanded}
                        />
                      </div>
                    </div>
                    {/* Live Initials Avatar */}
                    <div className="w-11 h-11 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <span className="text-white font-bold text-md">{initials || '?'}</span>
                    </div>
                  </div>
                  {fieldErrors.name && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mt-1">
                      {fieldErrors.name}
                    </motion.p>
                  )}
                  {!fieldErrors.name && name && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-xs mt-1">
                      ✓ Name looks good
                    </motion.p>
                  )}
                </div>
                
                {/* Email Field with Icon */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all ${fieldErrors.email ? 'border-red-500/50' : 'border-white/10'}`}
                      placeholder="client@example.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mt-1">
                      {fieldErrors.email}
                    </motion.p>
                  )}
                  {!fieldErrors.email && email && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-xs mt-1">
                      ✓ Valid email format
                    </motion.p>
                  )}
                </div>
                
                {/* Company Field */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Company <span className="text-gray-500 text-xs">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      placeholder="Acme Inc"
                    />
                  </div>
                </div>
                
                {/* Keyboard Shortcuts + Cancel */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <span className="text-[11px] text-gray-500 bg-white/10 px-2 py-1 rounded-md font-mono">⌘ + ↵</span>
                    <span className="text-[11px] text-gray-500 bg-white/10 px-2 py-1 rounded-md font-mono">Esc</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false)
                      setName('')
                      setEmail('')
                      setCompany('')
                      setFieldErrors({})
                    }}
                    className="text-sm text-gray-400 hover:text-white transition px-3 py-1 rounded-lg hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
                
                {/* Premium Button with Hover Effect */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/30"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Adding client...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Client
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}