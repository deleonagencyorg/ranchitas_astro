import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';

const SocialShare = ({
  url,
  title,
  description = '',
  hashtags = [],
  iconSize = 32,
  round = true,
  className = '',
  buttonClassName = '',
  platforms = ['facebook', 'twitter', 'whatsapp', 'telegram'],
  labels = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram'
  },
  showLabels = false
}) => {
  const renderButtons = () => {
    const buttons = [];

    if (platforms.includes('facebook')) {
      buttons.push(
        <div key="facebook" className={`inline-block ${buttonClassName}`}>
          <FacebookShareButton 
            url={url} 
            quote={`${title}\n${description}`}
            hashtag={hashtags.length > 0 ? `#${hashtags[0]}` : undefined}
          >
            <FacebookIcon size={iconSize} round={round} />
            {showLabels && <span className="block text-xs mt-1">{labels.facebook}</span>}
          </FacebookShareButton>
        </div>
      );
    }

    if (platforms.includes('twitter')) {
      buttons.push(
        <div key="twitter" className={`inline-block ${buttonClassName}`}>
          <TwitterShareButton url={url} title={title} hashtags={hashtags}>
            <TwitterIcon size={iconSize} round={round} />
            {showLabels && <span className="block text-xs mt-1">{labels.twitter}</span>}
          </TwitterShareButton>
        </div>
      );
    }

    if (platforms.includes('whatsapp')) {
      buttons.push(
        <div key="whatsapp" className={`inline-block ${buttonClassName}`}>
          <WhatsappShareButton url={url} title={`${title}\n${description}`}>
            <WhatsappIcon size={iconSize} round={round} />
            {showLabels && <span className="block text-xs mt-1">{labels.whatsapp}</span>}
          </WhatsappShareButton>
        </div>
      );
    }

    if (platforms.includes('telegram')) {
      buttons.push(
        <div key="telegram" className={`inline-block ${buttonClassName}`}>
          <TelegramShareButton url={url} title={`${title}\n${description}`}>
            <TelegramIcon size={iconSize} round={round} />
            {showLabels && <span className="block text-xs mt-1">{labels.telegram}</span>}
          </TelegramShareButton>
        </div>
      );
    }

    return buttons;
  };

  return (
    <div className={`social-share flex gap-2 items-center ${className}`}>
      {renderButtons()}
    </div>
  );
};

export default SocialShare;
