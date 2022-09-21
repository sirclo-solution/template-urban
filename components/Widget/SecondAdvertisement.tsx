/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
/* component library */
import useWindowSize from 'lib/useWindowSize'
import { useBannerSize } from 'lib/useBannerSize'
/* component */
import Placeholder from '../Placeholder'
import styles from 'public/scss/components/SecondAdvertisement.module.scss'

const placeholder = {
  placeholderImage: styles.secondAdvertisement_placeholder,
}

const SecondAdvertisement: FC = () => {
  const size = useWindowSize();

  return (
    <div className={styles.secondAdvertisement}>
      <Widget
        pos="main-content-2"
        containerClassName={styles.secondAdvertisement_container}
        widgetClassName={styles.secondAdvertisement_item}
        loadingComponent={<Placeholder classes={placeholder} withImage />}
        thumborSetting={{
          width: useBannerSize(size.width),
          format: 'webp',
          quality: 95,
        }}
      />
    </div>
  )
}

export default SecondAdvertisement
