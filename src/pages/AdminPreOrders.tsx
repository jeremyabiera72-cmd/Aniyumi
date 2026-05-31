import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, Inbox, ShoppingCart, 
  Users, Settings, LogOut, Bell, Search, Plus, 
  Edit2, Trash2 
} from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAppContext } from '../context/AppContext';

interface PreorderContainer {
  id: string;
  containerId: string;
  items: string;
  eta: string;
  status: string;
  totalStock: number;
  filled: number;
}

export function AdminPreOrders() {
  const { showToast } = useAppContext();
  const [containers, setContainers] = useState<PreorderContainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isAddingContainer, setIsAddingContainer] = useState(false);
  const [newContainer, setNewContainer] = useState({
    containerId: '',
    items: '',
    eta: '',
    status: 'Planning',
    totalStock: 100,
    filled: 0
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'preorders'), (snapshot) => {
      const data: PreorderContainer[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as PreorderContainer);
      });
      setContainers(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGenerateDummy = async () => {
    try {
      const dummys = [
        {
          containerId: 'CONT-JP-890',
          items: 'Metal Build EVA-01',
          eta: '2026-11-02',
          status: 'Planning',
          totalStock: 100,
          filled: 30
        },
        {
          containerId: 'CONT-JP-889',
          items: 'Nendoroid Gojo, Figma Levi',
          eta: '2026-10-15',
          status: 'In Transit',
          totalStock: 50,
          filled: 45
        }
      ];

      for (const d of dummys) {
        await addDoc(collection(db, 'preorders'), d);
      }
      showToast('Dummy data generated!', 'success');
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this container?')) {
      try {
        await deleteDoc(doc(db, 'preorders', id));
        showToast('Container deleted', 'success');
      } catch (error: any) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleCreateContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContainer.containerId || !newContainer.items || !newContainer.eta) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    
    try {
      await addDoc(collection(db, 'preorders'), {
        ...newContainer,
        totalStock: Number(newContainer.totalStock),
        filled: Number(newContainer.filled)
      });
      showToast('Container created successfully!', 'success');
      setIsAddingContainer(false);
      setNewContainer({
        containerId: '',
        items: '',
        eta: '',
        status: 'Planning',
        totalStock: 100,
        filled: 0
      });
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const filteredContainers = containers.filter(c => 
    c.containerId.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#13111c] text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1721] flex flex-col border-r border-white/5">
        <div className="p-6 flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold font-display tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
            <span className="text-accent-purple">Ani</span><span className="text-white">Yumi</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <Package size={18} />
            <span className="text-sm font-medium">Products</span>
          </a>
          <div className="flex items-center gap-3 px-4 py-3 text-accent-purple bg-accent-purple/10 rounded-xl">
            <Inbox size={18} />
            <span className="text-sm font-medium">Pre-Orders</span>
          </div>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <ShoppingCart size={18} />
            <span className="text-sm font-medium">Orders</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <Users size={18} />
            <span className="text-sm font-medium">Received Contacts</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>

        <div className="p-4">
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search globally..." 
              className="w-full bg-[#1a1721] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan flexItems-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-gray-500">Superadmin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Pre-Order Containers</h2>
              <p className="text-gray-400 text-sm">Manage incoming batches and pre-order requests.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleGenerateDummy}
                className="bg-[#24212c] hover:bg-[#2d2936] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Generate Dummy
              </button>
              <button 
                onClick={() => setIsAddingContainer(true)}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                New Container
              </button>
            </div>
          </div>

          {/* Search Table */}
          <div className="bg-[#1a1721] rounded-2xl border border-white/5 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search containers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#13111c] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full py-12 text-center text-gray-400">Loading containers...</div>
            ) : filteredContainers.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-400">No containers found.</div>
            ) : (
              filteredContainers.map((container) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={container.id} 
                  className="bg-[#1a1721] rounded-2xl border border-white/5 p-6 hover:border-accent-purple/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                        <Inbox size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold font-display">{container.containerId}</h3>
                        <p className="text-xs text-gray-400">ETA: {container.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-white p-1">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(container.id)} className="text-gray-400 hover:text-red-400 p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-1">Items Included:</div>
                    <div className="text-sm text-gray-300 truncate">{container.items}</div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Filled Capacity</span>
                      <span className="text-white font-medium">{container.filled} / {container.totalStock}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-purple rounded-full" 
                        style={{ width: `${Math.min(100, Math.max(0, (container.filled / container.totalStock) * 100))}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    {container.status === 'Planning' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
                        Planning
                      </span>
                    ) : container.status === 'In Transit' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                        In Transit
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 ring-1 ring-inset ring-gray-500/20">
                        {container.status}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* New Container Modal */}
      {isAddingContainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1721] rounded-2xl border border-white/10 w-full max-w-lg p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Add New Container</h3>
              <button 
                onClick={() => setIsAddingContainer(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreateContainer} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Container ID</label>
                  <input 
                    type="text" 
                    value={newContainer.containerId}
                    onChange={(e) => setNewContainer({...newContainer, containerId: e.target.value})}
                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple"
                    placeholder="e.g. CONT-JP-891"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">ETA (Date)</label>
                  <input 
                    type="date" 
                    value={newContainer.eta}
                    onChange={(e) => setNewContainer({...newContainer, eta: e.target.value})}
                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Items Included</label>
                <input 
                  type="text" 
                  value={newContainer.items}
                  onChange={(e) => setNewContainer({...newContainer, items: e.target.value})}
                  className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple"
                  placeholder="e.g. Nendoroid Gojo..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <select 
                    value={newContainer.status}
                    onChange={(e) => setNewContainer({...newContainer, status: e.target.value})}
                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple appearance-none"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Arrived">Arrived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Total Stock</label>
                  <input 
                    type="number" 
                    value={newContainer.totalStock}
                    onChange={(e) => setNewContainer({...newContainer, totalStock: Number(e.target.value)})}
                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Filled</label>
                  <input 
                    type="number" 
                    value={newContainer.filled}
                    onChange={(e) => setNewContainer({...newContainer, filled: Number(e.target.value)})}
                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent-purple"
                    min="0"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setIsAddingContainer(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-accent-purple hover:bg-accent-purple/90 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Create Container
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
