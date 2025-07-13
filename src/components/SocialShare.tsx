import { useState } from 'react';
import { Share2, Facebook, Twitter, Link, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
}

const SocialShare = ({ 
  url = window.location.href, 
  title = '', 
  description = '',
  hashtags = ['Morocco', 'Wedding', 'Venue'],
  className = ''
}: SocialShareProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title,
    text: description,
    url
  };

  const canUseNativeShare = navigator.share && navigator.canShare && navigator.canShare(shareData);

  const handleNativeShare = async () => {
    if (canUseNativeShare) {
      try {
        await navigator.share(shareData);
        toast({
          title: t('share.success'),
          description: t('share.successMessage'),
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast({
            title: t('share.error'),
            description: t('share.errorMessage'),
            variant: 'destructive',
          });
        }
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t('share.copied'),
        description: t('share.copiedMessage'),
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: t('share.error'),
        description: t('share.errorMessage'),
        variant: 'destructive',
      });
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const shareOnTwitter = () => {
    const text = `${title} ${description}`.trim();
    const hashtagString = hashtags.map(tag => `#${tag}`).join(' ');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags.join(','))}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const shareOnWhatsApp = () => {
    const text = `${title}\n${description}\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  if (canUseNativeShare) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className={className}
      >
        <Share2 className="w-4 h-4 mr-2" />
        {t('share.button')}
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          {t('share.button')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={shareOnFacebook}>
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter}>
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnWhatsApp}>
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          <Link className="w-4 h-4 mr-2" />
          {t('share.copyLink')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;