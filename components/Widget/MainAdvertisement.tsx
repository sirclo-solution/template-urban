/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
/* component library */
import useWindowSize from 'lib/useWindowSize'
import { useBannerSize } from 'lib/useBannerSize'
/* component */
import Placeholder from '../Placeholder'
import styles from 'public/scss/components/MainAdvertisement.module.scss'

const placeholder = {
  placeholderImage: styles.mainAdvertisement_placeholder,
}

const MainAdvertisement: FC = () => {
  const size = useWindowSize()

  return (
    <div className={styles.mainAdvertisement}>
      <Widget
        pos="main-content-1"
        containerClassName={styles.mainAdvertisement_container}
        widgetClassName={styles.mainAdvertisement_item}
        loadingComponent={
          <div className={styles.mainAdvertisement_placeholderContainer}>
            <Placeholder classes={placeholder} withImage />  
            <Placeholder classes={placeholder} withImage />  
          </div>
        }
        thumborSetting={{
          width: useBannerSize(size.width),
          format: 'webp',
          quality: 95,
        }}
      />
    </div>
  )
}

export default MainAdvertisement
