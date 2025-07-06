
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Award, Book, Trophy, Calendar } from 'lucide-react';

interface AchievementItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'scholarship' | 'certificate' | 'result' | 'event';
  likes: number;
}

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('academic');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

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

  const [achievements, setAchievements] = useState<AchievementItem[]>([
    {
      id: 1,
      title: 'Dean\'s List Honor',
      description: 'Achieved Dean\'s List recognition for academic excellence with GPA above 3.8',
      date: '2023',
      category: 'academic',
      likes: 15,
    },
    {
      id: 2,
      title: 'Best Student Award',
      description: 'Recognized as the best student in Computer Science department',
      date: '2023',
      category: 'academic',
      likes: 22,
    },
    {
      id: 3,
      title: 'Merit Scholarship',
      description: 'Awarded full tuition scholarship based on academic performance',
      date: '2022-2024',
      category: 'scholarship',
      likes: 18,
    },
    {
      id: 4,
      title: 'Government Scholarship',
      description: 'Received state government scholarship for engineering students',
      date: '2022',
      category: 'scholarship',
      likes: 12,
    },
    {
      id: 5,
      title: 'React Developer Certificate',
      description: 'Completed advanced React development certification program',
      date: '2023',
      category: 'certificate',
      likes: 28,
    },
    {
      id: 6,
      title: 'Full Stack Development',
      description: 'Certified in full stack web development with MERN stack',
      date: '2023',
      category: 'certificate',
      likes: 31,
    },
    {
      id: 7,
      title: 'Final Year Results',
      description: 'Successfully completed final year with distinction (88%)',
      date: '2024',
      category: 'result',
      likes: 25,
    },
    {
      id: 8,
      title: 'Semester Topper',
      description: 'Topped the semester with highest marks in all subjects',
      date: '2023',
      category: 'result',
      likes: 19,
    },
    {
      id: 9,
      title: 'Tech Fest Winner',
      description: 'Won first prize in web development competition at college tech fest',
      date: '2023',
      category: 'event',
      likes: 34,
    },
    {
      id: 10,
      title: 'Hackathon Participant',
      description: 'Participated in 24-hour hackathon and developed innovative solution',
      date: '2023',
      category: 'event',
      likes: 16,
    },
  ]);

  const tabs = [
    { id: 'academic', label: 'Academic', icon: Book },
    { id: 'scholarship', label: 'Scholarships', icon: Award },
    { id: 'certificate', label: 'Certificates', icon: Trophy },
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

  return (
    <section id="achievements" ref={sectionRef} className="py-16 px-6" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          My Achievements
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <span className="text-cyan-400 text-sm font-medium">
                    {item.date}
                  </span>
                </div>
                <button
                  onClick={() => handleLike(item.id)}
                  className="p-2 hover:scale-110 transition-transform duration-200 ml-4"
                >
                  <Heart 
                    className={`w-5 h-5 ${likedItems.has(item.id) ? 'fill-red-500 text-red-500' : 'text-white/60'}`}
                  />
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-white/60 text-sm">{item.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
