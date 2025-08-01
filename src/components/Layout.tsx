import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Store, 
  Users, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Clock,
  Boxes,
  MessageCircle,
  Bell,
  User
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { MessagingWidget } from './MessagingWidget';
import { NotificationWidget } from './NotificationWidget';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const adminMenuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Produits', path: '/admin/produits' },
    { icon: Boxes, label: 'Stocks', path: '/admin/stocks' },
    { icon: Store, label: 'Magasins', path: '/admin/magasins' },
    { icon: Truck, label: 'Fournisseurs', path: '/admin/fournisseurs' },
    { icon: Users, label: 'Utilisateurs', path: '/admin/utilisateurs' },
    { icon: Clock, label: 'Présences', path: '/admin/presences' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' }
  ];

  const employeMenuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/employe/dashboard' },
    { icon: Package, label: 'Stock', path: '/employe/stock' },
    { icon: Clock, label: 'Pointage', path: '/employe/pointage' }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : employeMenuItems;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8" />
            <span className="text-xl font-bold">StockPro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors duration-200"
            >
              <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Gestion de Stock
              </h1>
            </div>
            
            {/* User info and notifications in top right */}
            <div className="flex items-center space-x-4">
              {user?.role === 'admin' && <NotificationWidget />}
              
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {user?.image_url ? (
                    <img
                      src={`http://localhost:8000${user.image_url}`}
                      alt={`${user.prenom} ${user.nom}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {user?.prenom} {user?.nom}
                  </p>
                  <p className="text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  title="Se déconnecter"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Messaging Widget */}
      <MessagingWidget />
    </div>
  );
};