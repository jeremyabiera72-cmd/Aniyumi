import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, MapPin, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function Contact() {
  const { showToast } = useAppContext();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('preorder');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      showToast('Please fill out all fields.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        subject,
        message,
        date: new Date().toISOString(),
        status: 'new'
      });
      showToast('Your message has been sent to our proxies. We will get back to you shortly!', 'success');
      setName('');
      setEmail('');
      setSubject('preorder');
      setMessage('');
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-accent-purple/30 pt-28 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 flex-grow w-full">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 text-accent-cyan mb-6"
          >
            <MessageSquare size={16} />
            <span className="text-xs font-bold uppercase tracking-widest text-accent-purple">Get in Touch</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have a question about a pre-order, tracking an overseas shipment, or finding a rare figure? Our proxies are here to help.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-surface-dark border border-white/5 p-8 rounded-3xl hover:border-accent-purple/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">For general inquiries, pre-order statuses, and support requests.</p>
              <a href="mailto:jeremyabiera72@gmail.com" className="text-accent-cyan font-semibold hover:underline border-b border-accent-cyan/30 pb-0.5 inline-flex items-center gap-1 group">
                jeremyabiera72@gmail.com
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-surface-dark border border-white/5 p-8 rounded-3xl hover:border-accent-cyan/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Davao Office</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">Our sourcing proxy office is located in the Central Of Davao City</p>
              <address className="text-gray-300 not-italic text-sm">
               1-2-3 Davao Central<br />
                Davao central , 123 street<br />
                Yumi Street, 68
              </address>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface-light border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-8 relative z-10">Send a Message</h3>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-base-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all placeholder:text-gray-600" 
                      placeholder="Crystelle Faith Gorgonio" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-base-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all placeholder:text-gray-600" 
                      placeholder="CrystelleFaith@gmail.com" 
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-base-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="preorder">Pre-Order Inquiry</option>
                    <option value="shipping">Shipping & Tracking</option>
                    <option value="proxy">Proxy Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea 
                    rows={5} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-base-dark border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all resize-none placeholder:text-gray-600" 
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-accent-purple hover:bg-white hover:text-base-dark text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_var(--color-accent-purple-glow)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
