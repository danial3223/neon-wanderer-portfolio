
import { AchievementItem } from './types';
import LikeButton from './LikeButton';

interface AchievementCardProps {
  item: AchievementItem;
  isLiked: boolean;
  onLike: (itemId: number) => void;
  onClick: (item: AchievementItem) => void;
}

const AchievementCard = ({ item, isLiked, onLike, onClick }: AchievementCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
      {item.image && (
        <div className="mb-4">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-48 object-cover rounded-lg border border-white/20 ${
              item.category === 'certificate' ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            }`}
            onClick={() => onClick(item)}
          />
        </div>
      )}
      
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
        <LikeButton
          itemId={item.id}
          isLiked={isLiked}
          onLike={onLike}
        />
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-white/10">
        <span className="text-white/60 text-sm">{item.likes} likes</span>
        {item.image && item.category === 'certificate' && (
          <span className="text-cyan-400 text-xs">Click image to view full certificate</span>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
