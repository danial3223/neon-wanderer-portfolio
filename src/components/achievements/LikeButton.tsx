
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  itemId: number;
  isLiked: boolean;
  onLike: (itemId: number) => void;
}

const LikeButton = ({ itemId, isLiked, onLike }: LikeButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('LikeButton clicked for item:', itemId, 'isLiked:', isLiked);
    onLike(itemId);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 hover:scale-110 transition-transform duration-200 ml-4 flex-shrink-0 focus:outline-none"
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <Heart 
        className={`w-5 h-5 transition-colors duration-200 ${
          isLiked 
            ? 'fill-red-500 text-red-500' 
            : 'text-white/60 hover:text-red-400'
        }`}
      />
    </button>
  );
};

export default LikeButton;
