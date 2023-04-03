/* library package */
import { FC, useState } from 'react'
import { InstagramFeed } from '@sirclo/nexus'
import Slider from 'react-slick'

/* library template */
import useWindowSize from 'lib/useWindowSize'

/* component */
import Placeholder from 'components/Placeholder'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'

/* styles */
import styles from 'public/scss/components/InstaFeed.module.scss'
import { useBannerSize } from 'lib/useBannerSize'

const classesInstagramFeed = {
  containerClassName: styles.instagramFeed,
  mediaClassName: styles.instagramFeed_item,
  anchorClassName: styles.instagramFeed_link,
  imageClassName: styles.instagramFeed_image
}

const classesPlaceholderInstafeed = {
  placeholderList: styles.instagramFeed_placeholder
}

type InstafeedType = {
  i18n: any,
  brand: any,
  title?: string,
  withQuickview?: boolean,
  withFollowButton?: boolean,
  followButtonText?: string
}

const Instafeed: FC<InstafeedType> = ({
  i18n,
  brand,
  title = brand?.socmedSetting?.socmedLink?.instagram?.replace("https://www.instagram.com/", ""),
  withFollowButton = false,
  followButtonText = i18n.t("instagram.cta")
}) => {
  const size: any = useWindowSize()
  const [totalPost, setTotalPost] = useState(null)
  const handleFollowButton = () => window.open(brand?.socmedSetting?.socmedLink?.instagram);

  return (
    <>
      {title && totalPost ? (
        <div className={styles.instagramFeed_titleContainer}>
          <h2 className={styles.instagramFeed_followUs}>{followButtonText}</h2>
          {withFollowButton && (
            <div className={styles.instagramFeed_usernameContainer} onClick={handleFollowButton}>
              <span className={styles.instagramFeed_title}>@{title}</span>
              <span className={styles.instagramFeed_arrow}/>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      <InstagramFeed
        postLimit={6}
        classes={classesInstagramFeed}
        Carousel={size.width <= 765 && Slider}
        emptyStateComponent={EmptyComponent}
        getReturnedMediaCount={(mediaCount: number) => setTotalPost(mediaCount)}
        loadingComponent={
          <div className={styles.instagramFeed_placeholderWrapper}>
            <Placeholder
              classes={classesPlaceholderInstafeed}
              withList
              listMany={size.width < 765 ? 1 : 6}
            />
          </div>
        }
        thumborSetting={{
          width: useBannerSize(size.width),
          format: 'webp',
          quality: 95,
        }}
      />
    </>
  )
}

export default Instafeed