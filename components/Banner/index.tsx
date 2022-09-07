/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import { Banner } from '@sirclo/nexus'
import Slider from 'react-slick'
/* component library */
import useWindowSize from 'lib/useWindowSize'
import { useBannerSize } from 'lib/useBannerSize'

import Placeholder from 'components/Placeholder'
import styleBanner from 'public/scss/components/Banner.module.scss'

const classesBanner = {
  imageContainerClassName: styleBanner.bannerCarousel_header,
  linkClassName: styleBanner.bannerCarousel_link,
  imageClassName: styleBanner.bannerCarousel_image
}

const placeholder = {
  placeholderImage: styleBanner.bannerCarousel_placeholder,
}

const BannerComponent: FC<any> = ({ dataBanners }) => {
  const size = useWindowSize();
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    if (!isReady) setIsReady(true)
  }, [isReady])

  return (
    <div className={styleBanner.container}>
      <Banner
        data={dataBanners?.data}
        Carousel={Slider}
        classes={classesBanner}
        lazyLoadedImage={false}
        autoplay={true}
        autoplaySpeed={5000}
        arrows={false}
        infinite={true}
        slidesToShow={1}
        slidesToScroll={1}
        adaptiveHeight={true}
        thumborSetting={{
          width: useBannerSize(size.width),
          format: "webp",
          quality: 95,
        }}
        loadingComponent={
          <Placeholder classes={placeholder} withImage />
        }
      />
    </div>
  )
}

export default BannerComponent