import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `Bonjour ${user?.prenom || 'utilisateur'} ! Je suis votre assistant IA intelligent pour StockPro. Je peux vous aider avec toutes les fonctionnalités de l'application. Comment puis-je vous assister aujourd'hui ?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Réponses contextuelles selon le rôle
    const isAdmin = user?.role === 'admin';
    
    // Salutations et politesse
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello') || message.includes('bonsoir')) {
      return `Bonjour ${user?.prenom || 'utilisateur'} ! Ravi de vous revoir. Je suis là pour vous aider avec StockPro. Que puis-je faire pour vous aujourd'hui ?`;
    }

    if (message.includes('merci') || message.includes('remercie')) {
      return 'Je vous en prie ! C\'est un plaisir de vous aider. N\'hésitez pas si vous avez d\'autres questions sur StockPro.';
    }

    if (message.includes('au revoir') || message.includes('bye') || message.includes('à bientôt')) {
      return 'Au revoir ! J\'espère avoir pu vous aider. À bientôt sur StockPro !';
    }
    
    // Gestion du stock
    if (message.includes('stock') || message.includes('inventaire') || message.includes('quantité')) {
      if (isAdmin) {
        return 'Pour gérer votre stock efficacement :\n\n📊 **Dashboard** : Consultez les statistiques globales et alertes\n📦 **Gestion des Stocks** : Ajoutez, modifiez et suivez les quantités\n📈 **Mouvements** : Historique complet des entrées/sorties\n⚠️ **Alertes** : Notifications automatiques pour les stocks bas\n\nVoulez-vous que je vous guide sur une fonctionnalité spécifique ?';
      } else {
        return 'Pour gérer le stock de votre magasin :\n\n📦 **Section Stock** : Consultez les produits disponibles\n➕ **Mouvements** : Enregistrez les entrées/sorties\n📊 **Quantités** : Vérifiez les niveaux actuels\n⚠️ **Alertes** : Surveillez les produits en rupture\n\nBesoin d\'aide pour une action spécifique ?';
      }
    }
    
    // Pointage et présences
    if (message.includes('pointage') || message.includes('présence') || message.includes('pointer') || message.includes('horaire')) {
      if (isAdmin) {
        return 'Gestion des présences administrateur :\n\n👥 **Section Présences** : Consultez tous les pointages\n📊 **Statistiques** : Temps de travail et pauses\n📄 **Exports** : Générez des rapports CSV/PDF\n📍 **Géolocalisation** : Vérifiez la validité des pointages\n\nQuelle information recherchez-vous ?';
      } else {
        return 'Pour votre pointage quotidien :\n\n🕐 **Arrivée/Départ** : Pointez dans un rayon de 100m du magasin\n☕ **Pauses** : Gérez vos temps de pause\n📱 **Géolocalisation** : Activez le GPS pour pointer\n📊 **Historique** : Consultez vos pointages précédents\n\nProblème avec le pointage ?';
      }
    }
    
    // Produits
    if (message.includes('produit') || message.includes('article') || message.includes('référence')) {
      if (isAdmin) {
        return 'Gestion des produits :\n\n➕ **Ajouter** : Créez de nouveaux produits avec images\n✏️ **Modifier** : Mettez à jour prix, seuils, catégories\n🏷️ **Références** : Gérez les codes produits\n⚠️ **Seuils d\'alerte** : Configurez les alertes de stock\n🏭 **Fournisseurs** : Associez aux fournisseurs\n\nQue souhaitez-vous faire ?';
      } else {
        return 'Consultation des produits :\n\n📦 **Catalogue** : Consultez tous les produits de votre magasin\n💰 **Prix** : Vérifiez les tarifs actuels\n📊 **Stock** : Quantités disponibles\n🔍 **Recherche** : Trouvez rapidement un produit\n\nCherchez-vous un produit en particulier ?';
      }
    }
    
    // Magasins
    if (message.includes('magasin') || message.includes('boutique') || message.includes('point de vente')) {
      if (isAdmin) {
        return 'Gestion des magasins :\n\n🏪 **Créer/Modifier** : Configurez vos points de vente\n📍 **Géolocalisation** : Définissez les coordonnées GPS\n📸 **Images** : Ajoutez des photos des magasins\n👥 **Assignation** : Liez les employés aux magasins\n\nQuelle action voulez-vous effectuer ?';
      } else {
        return 'Informations sur votre magasin :\n\n🏪 **Magasin assigné** : Détermine votre zone de pointage\n📍 **Localisation** : Rayon de 100m pour pointer\n📦 **Stock local** : Produits de votre magasin uniquement\n\nContactez votre administrateur pour changer d\'assignation.';
      }
    }
    
    // Utilisateurs et équipe
    if (message.includes('utilisateur') || message.includes('employé') || message.includes('équipe') || message.includes('compte')) {
      if (isAdmin) {
        return 'Gestion des utilisateurs :\n\n👤 **Créer** : Nouveaux comptes employés/admins\n✏️ **Modifier** : Rôles, magasins, informations\n🔐 **Permissions** : Admin vs Employé\n🏪 **Assignation** : Liez aux magasins\n📊 **Activité** : Consultez les présences\n\nQue voulez-vous gérer ?';
      } else {
        return 'Gestion de votre compte :\n\n👤 **Profil** : Vos informations personnelles\n🔐 **Permissions** : Définies par votre administrateur\n🏪 **Magasin** : Votre point de vente assigné\n\nPour modifier vos permissions, contactez votre administrateur.';
      }
    }

    // Messages et communication
    if (message.includes('message') || message.includes('communication') || message.includes('chat')) {
      if (isAdmin) {
        return 'Système de messagerie :\n\n💬 **Messages** : Communiquez avec tous les employés\n📨 **Notifications** : Recevez les alertes importantes\n👥 **Conversations** : Discussions individuelles\n🔔 **Temps réel** : Messages instantanés\n\nVoulez-vous envoyer un message ?';
      } else {
        return 'Communication avec l\'équipe :\n\n💬 **Messages** : Contactez les administrateurs\n📨 **Notifications** : Recevez les informations importantes\n🤖 **Assistant IA** : Moi, pour l\'aide technique !\n\nComment puis-je vous aider à communiquer ?';
      }
    }

    // Dashboard et statistiques
    if (message.includes('dashboard') || message.includes('tableau de bord') || message.includes('statistique') || message.includes('rapport')) {
      if (isAdmin) {
        return 'Votre dashboard administrateur :\n\n📊 **Vue d\'ensemble** : Statistiques globales en temps réel\n📈 **Graphiques** : Répartition des stocks par magasin\n⚠️ **Alertes** : Produits en rupture de stock\n💰 **Valeur** : Valeur totale de votre inventaire\n📋 **Résumé** : Produits, magasins, utilisateurs\n\nQuelle métrique vous intéresse ?';
      } else {
        return 'Votre dashboard employé :\n\n🏪 **Votre magasin** : Informations spécifiques à votre point de vente\n📦 **Stock local** : Produits de votre magasin\n⚠️ **Alertes** : Produits à réapprovisionner\n⚡ **Actions rapides** : Pointage et consultation stock\n\nQue souhaitez-vous consulter ?';
      }
    }

    // Problèmes techniques
    if (message.includes('problème') || message.includes('erreur') || message.includes('bug') || message.includes('marche pas') || message.includes('fonctionne pas')) {
      return '🔧 **Dépannage technique** :\n\n1️⃣ **Rafraîchir** : Actualisez la page (F5)\n2️⃣ **Connexion** : Vérifiez votre connexion internet\n3️⃣ **Cache** : Videz le cache du navigateur\n4️⃣ **Navigateur** : Utilisez Chrome, Firefox ou Safari récent\n\n🆘 Si le problème persiste, contactez votre administrateur avec une description détaillée.';
    }

    // Aide générale
    if (message.includes('aide') || message.includes('help') || message.includes('comment') || message.includes('tutorial')) {
      if (isAdmin) {
        return '🎯 **Aide administrateur** - Je peux vous assister avec :\n\n📦 **Stock** : Gestion, mouvements, alertes\n🏪 **Magasins** : Configuration, géolocalisation\n👥 **Utilisateurs** : Création, permissions, assignation\n📊 **Rapports** : Statistiques, exports\n⚙️ **Paramètres** : Configuration système\n\n💡 **Astuce** : Soyez spécifique dans vos questions pour une aide personnalisée !';
      } else {
        return '🎯 **Aide employé** - Je peux vous aider avec :\n\n🕐 **Pointage** : Arrivée, départ, pauses\n📦 **Stock** : Consultation, mouvements\n💬 **Messages** : Communication avec l\'équipe\n📱 **Application** : Navigation, fonctionnalités\n\n💡 **Astuce** : Décrivez votre besoin précis pour une aide ciblée !';
    }

    // Fonctionnalités avancées
    if (message.includes('export') || message.includes('rapport') || message.includes('pdf') || message.includes('csv')) {
      if (isAdmin) {
        return '📄 **Exports et rapports** :\n\n📊 **Présences** : Rapports PDF/CSV des pointages\n📈 **Statistiques** : Données de performance\n📋 **Inventaire** : États des stocks\n⏰ **Périodes** : Filtrez par dates\n\nQuel type de rapport souhaitez-vous générer ?';
      } else {
        return 'Les exports sont réservés aux administrateurs. Contactez votre responsable pour obtenir des rapports spécifiques.';
      }
    }

    // Sécurité et permissions
    if (message.includes('sécurité') || message.includes('permission') || message.includes('accès') || message.includes('mot de passe')) {
      return '🔐 **Sécurité StockPro** :\n\n✅ **Authentification** : Connexion sécurisée requise\n🎭 **Rôles** : Admin vs Employé avec permissions différentes\n📍 **Géolocalisation** : Pointage sécurisé par GPS\n🔄 **Sessions** : Déconnexion automatique pour la sécurité\n\n⚠️ Ne partagez jamais vos identifiants !';
    }

    // Réponse par défaut intelligente
    const responses = [
      `Je comprends votre question sur "${userMessage}". Pour vous donner la meilleure réponse possible, pourriez-vous être plus spécifique ? Par exemple, cherchez-vous de l'aide sur le stock, le pointage, ou une autre fonctionnalité ?`,
      `Intéressant ! Votre question concerne "${userMessage}". Je peux vous aider avec toutes les fonctionnalités de StockPro. Précisez votre besoin et je vous guiderai étape par étape.`,
      `Je vois que vous vous intéressez à "${userMessage}". Pour une assistance optimale, dites-moi exactement ce que vous souhaitez faire dans StockPro.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.isBot ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-xs font-medium">
                  {message.isBot ? 'Assistant IA' : user?.prenom || 'Vous'}
                </span>
              </div>
              <div className="text-sm whitespace-pre-line">{message.content}</div>
              <p className={`text-xs mt-1 ${
                message.isBot ? 'text-gray-500' : 'text-blue-100'
              }`}>
                {message.timestamp.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span className="text-xs font-medium">Assistant IA</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Posez votre question..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};