
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievementsData } from './achievements/achievementsData';
import { tabs } from './achievements/achievementsData';
import { AchievementItem } from './achievements/types';
import TabNavigation from './achievements/TabNavigation';
import AchievementCard from './achievements/AchievementCard';
import CertificateModal from './CertificateModal';

const Achievements = () => {
  const [activeTab, setActiveTab] = useState('certificates');
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [achievementItems, setAchievementItems] = useState<AchievementItem[]>(achievementsData);
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    image?: string;
    description: string;
    date: string;
  } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  const handleLike = (itemId: number) => {
    console.log('Like button clicked for item:', itemId);
    
    const isCurrentlyLiked = likedItems.includes(itemId);
    console.log('Is currently liked:', isCurrentlyLiked);
    
    setLikedItems(prev => {
      if (isCurrentlyLiked) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });

    setAchievementItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newLikes = isCurrentlyLiked ? item.likes - 1 : item.likes + 1;
          console.log('Updating likes for item:', itemId, 'from', item.likes, 'to', newLikes);
          return { ...item, likes: newLikes };
        }
        return item;
      })
    );
  };

  const handleItemClick = (item: AchievementItem) => {
    if ((item.category === 'certificate' || item.category === 'academic' || item.category === 'scholarship') && item.image) {
      setSelectedItem({
        title: item.title,
        image: item.image,
        description: item.description,
        date: item.date
      });
    }
  };

  const filteredAchievements = achievementItems.filter(item => {
    switch (activeTab) {
      case 'academic':
        return item.category === 'academic';
      case 'scholarships':
        return item.category === 'scholarship';
      case 'certificates':
        return item.category === 'certificate';
      case 'events':
        return item.category === 'event';
      case 'results':
        return item.category === 'result';
      default:
        return true;
    }
  });

  return (
    <>
      <section id="achievements" ref={sectionRef} className="py-16 px-6" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            My Achievements
          </h2>

          <TabNavigation 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item) => (
              <AchievementCard
                key={item.id}
                item={item}
                isLiked={likedItems.includes(item.id)}
                onLike={handleLike}
                onClick={handleItemClick}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <CertificateModal
          certificate={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default Achievements;
