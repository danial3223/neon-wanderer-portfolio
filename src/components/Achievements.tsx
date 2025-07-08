
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Book, Trophy, Calendar } from 'lucide-react';
import CertificateModal from './CertificateModal';
import TabNavigation from './achievements/TabNavigation';
import AchievementCard from './achievements/AchievementCard';
import { AchievementItem, Tab } from './achievements/types';
import { achievementsData } from './achievements/achievementsData';

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('certificate');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [selectedCertificate, setSelectedCertificate] = useState<AchievementItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState<AchievementItem[]>(achievementsData);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const tabs: Tab[] = [
    { id: 'certificate', label: 'Certificates', icon: Trophy },
    { id: 'academic', label: 'Academic', icon: Book },
    { id: 'scholarship', label: 'Scholarships', icon: Award },
    { id: 'result', label: 'Results', icon: Trophy },
    { id: 'event', label: 'Events', icon: Calendar },
  ];

  const filteredAchievements = achievements.filter(item => item.category === activeTab);

  const handleLike = (itemId: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        setAchievements(prevItems => 
          prevItems.map(item => item.id === itemId ? { ...item, likes: item.likes - 1 } : item)
        );
      } else {
        newSet.add(itemId);
        setAchievements(prevItems => 
          prevItems.map(item => item.id === itemId ? { ...item, likes: item.likes + 1 } : item)
        );
      }
      return newSet;
    });
  };

  const handleCertificateClick = (item: AchievementItem) => {
    if (item.image && item.category === 'certificate') {
      setSelectedCertificate(item);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <section id="achievements" ref={sectionRef} className="py-16 px-6" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          My Achievements
        </h2>

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <AchievementCard
              key={item.id}
              item={item}
              isLiked={likedItems.has(item.id)}
              onLike={handleLike}
              onCertificateClick={handleCertificateClick}
            />
          ))}
        </div>
      </div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCertificate}
      />
    </section>
  );
};

export default Achievements;
