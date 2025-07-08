
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  itemId: number;
  isLiked: boolean;
  onLike: (itemId: number) => void;
}

const LikeButton = ({ itemId, isLiked, onLike }: LikeButtonProps) => {
  return (
    <button
      onClick={() => onLike(itemId)}
      className="p-2 hover:scale-110 transition-transform duration-200 ml-4 flex-shrink-0"
    >
      <Heart 
        className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white/60'}`}
      />
    </button>
  );
};

export default LikeButton;
