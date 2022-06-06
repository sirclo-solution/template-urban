/* Library Package */
import {
  FC,
  useEffect,
  useState
} from 'react'
import { withBrand } from '@sirclo/nexus'
import { ToastContainer } from 'react-toastify'

/* Component */
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import PageNotFound from 'components/PageNotFound'
import SEOHead from 'components/SEO'
import Newsletter from 'components/Newsletters'
import GoogleTagManager from 'components/GoogleTagManager'

/* Styles */
import styles from 'public/scss/components/Layout.module.scss'

type LayoutPropType = {
  lngDict: any
  i18n: any
  lng: string
  layoutClassName?: string
  withHeader?: boolean
  withFooter?: boolean
  withAllowed?: boolean | undefined
  [otherProp: string]: any
};

const Layout: FC<LayoutPropType> = ({
  lng,
  lngDict,
  i18n,
  withHeader = true,
  withFooter = true,
  withAllowed = true,
  brand,
  SEO,
  layoutClassName = "Layout-layoutClassName",
  layoutClassNameMaster = "Layout-layoutClassNameMaster",
  ...props
}) => {

  const [mobileMenuToggled, setMobileMenuToggled] = useState<boolean>(false)

  useEffect(() => {
    i18n?.locale(lng, lngDict)
  }, [lng, lngDict])

  useEffect(() => {
    if (brand?.googleAdsWebsiteMetaToken) getToken()
  }, [brand])

  useEffect(() => {
    if (mobileMenuToggled) {
      document.querySelector('body').classList.add(styles.body__noOverflow)
    } else {
      document.querySelector('body').classList.remove(styles.body__noOverflow)
    }
  }, [mobileMenuToggled])

  const masterLayoutClassName = `${layoutClassNameMaster}`

  const SEOprops = {
    hideFromSearchEngine: brand?.settings?.hideFromSearchEngine,
    title: `${brand?.settings?.websiteTitle}${SEO?.title && ' - ' + SEO?.title}` || "",
    description: SEO?.desc || brand?.settings?.websiteDescription,
    image: SEO?.image || brand?.logoURL,
    keywords: SEO?.keywords || ''
  }

  const getToken = (): string => {
    const googleAdsWebsiteMetaToken = brand?.googleAdsWebsiteMetaToken
    const token: string = googleAdsWebsiteMetaToken.replace(/.*content="([^"]*)".*/, "$1")
    return token
  }

  return (
    <GoogleTagManager brand={brand}>
      <SEOHead {...SEOprops}>
        <title>{brand?.settings?.websiteTitle} {SEO?.title && "-"} {SEO?.title}</title>
        {brand?.settings?.hideFromSearchEngine && (
          <meta name="robots" content="noindex, nofollow" />
        )}

        <link
          rel="shortcut icon"
          href={brand?.settings?.faviconURL}
          type="image/x-icon"
        />

      </SEOHead>

      <section className={masterLayoutClassName}>

        {withHeader &&
          <Header lng={lng} mobileState={mobileMenuToggled} setMobileState={setMobileMenuToggled} />
        }

        <main className={layoutClassName}>
          {withAllowed ?
            props.children
            :
            <PageNotFound i18n={i18n} />
          }
        </main>

        {withFooter &&
          <Footer brand={brand} />
        }

      </section>
      {/* @ts-ignore */}
      <ToastContainer />
      <Newsletter i18n={i18n} />
    </GoogleTagManager>
  )
}

export default withBrand(Layout)